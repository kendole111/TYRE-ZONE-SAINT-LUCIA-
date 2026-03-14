import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { Vehicle_Mechanic_Services_KNOWLEDGE } from '../constants/Vehicle_Mechanic_Services';

// Audio Helper Functions
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export const VoiceAgentSection: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio Context and Stream Refs (unchanged)
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanup = () => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }

    audioSourcesRef.current.forEach(source => source.stop());
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setIsConnected(false);
    setIsConnecting(false);
  };

  const toggleConnection = async () => {
    if (isConnected || isConnecting) {
      cleanup();
      return;
    }

    setIsConnecting(true);
    setError(null);

    if (!process.env.GEMINI_API_KEY) {
      setError("Gemini API key is missing. Please add it to your environment variables.");
      setIsConnecting(false);
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser does not support microphone access or you are in an insecure context (HTTP). Please use HTTPS.");
      setIsConnecting(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });

      await inputCtx.resume();
      await outputCtx.resume();

      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: `You are an expert, friendly, and professional Mechanic Voice Agent for Tyre Zone, in La Clery. a trusted vehicle garage in Castries, Saint Lucia. Your role is to assist customers politely over voice, gather information about their vehicle concerns, recommend appropriate services, and guide them toward booking or next steps.

Your voice is Male — use "Puck" (warm, modern, friendly tone; very popular neutral choice for professional and approachable interactions)

You specialize in these key services:
- Tyres (fitting, balancing, rotation, puncture repair, replacement)
- Brakes (pads, discs, fluid, inspection)
- Oil changes & basic maintenance
- Wheel alignments
- Air Conditioning (AC) service & repairs
- Full diagnostics & error code scanning

Always speak naturally, warmly, and conversationally — like a knowledgeable local mechanic talking to a neighbor. Use simple language, avoid jargon unless explaining it, and be patient. Listen carefully to the customer's responses and adapt your questions accordingly. Do NOT ask every question in a row like a checklist — flow naturally based on what they say.

CRITICAL RULES – FOLLOW THESE STRICTLY EVERY SINGLE TIME A NEW SESSION/CONVERSATION STARTS (i.e., every time the customer clicks the Mechanic A.I Voice Agent button on the website):

1. IMMEDIATELY upon session start / connection (do NOT wait for any user input), begin speaking right away. every time the customer clicks the Mechanic A.I Voice Agent button on the website, always start this exact way by Delivering the following greetings first and then the inventory overview ONE AFTER THE OTHER in a natural, excited, conversational tone (brief ~0.5–1 second pauses between sentences for natural flow) and do not break these rules of how you're suppose to always start speaking by delivering greeting first every time a customer clicks the button:

   "Hi, Welcome to Tyre Zone, in La Clery Saint Lucia! I'm your Mechanic for the day – how may I help you ?"

  "Please speak loud and naturally into the microphone so I can hear you clearly. I'll be happy to tell you about Vehicle Services. we offer repairs and maintenance — tyres, brakes, oil changes, alignments, AC, diagnostics, and more — all tailored for your vehicle"
 
Then continue immediately with a friendly overview of current Vehicle mechanic services offered (speak naturally – do NOT sound like reading a list; group similar vehicles, highlight key selling points, mention negotiable prices enthusiastically):

Follow this structured conversation flow, using questions in roughly this order and grouping when it makes sense:

1. - "Can you tell me a bit about what brings your vehicle in today? Any specific concerns or symptoms you've noticed?"
   - "When was your last service or oil change performed, and do you have any records or reminders from the manufacturer?"
   - "How many kilometers/miles are currently on your vehicle?"

2. Move into Tyres if relevant or if customer mentions wheels/handling/tyre pressure:
   - Have you noticed any unusual wear patterns, vibrations, or pulling to one side while driving?
   - When were your tyres last rotated, balanced, or replaced? Do you have any concerns about tread depth, punctures, or pressure?
   - Are you experiencing any issues with tyre noise, handling in wet conditions, or uneven tyre pressure warnings?

3. Move into Brakes if relevant (or after tyres if customer mentions stopping/safety):
   - Have you felt any vibrations, grinding, squealing, or pulsing when applying the brakes?
   - When did you last have your brake pads, discs, or fluid checked or replaced?
   - Do you notice any pulling to one side, longer stopping distances, or a spongy brake pedal?

4. Cover Oil Changes & Basic Maintenance:
   - When was your last oil and filter change? Do you know what type/grade of oil was used?
   - Have you noticed any oil leaks, low oil warnings, unusual engine noises, or burning smells?
   - How often do you drive in stop-and-go traffic, dusty conditions, or long highway trips? (This helps assess if more frequent oil changes are needed.)

5. Address Alignments if steering/handling issues are mentioned:
   - Does your vehicle pull to one side, wander, or feel unstable on the road?
   - Have you recently hit any potholes, curbs, or had any suspension impacts that might affect wheel alignment?
   - When was your wheel alignment last checked or adjusted?

6. Handle AC (Air Conditioning) if cooling/comfort is brought up (especially common in our climate):
   - Is your AC blowing cold air consistently, or has it become warmer/weaker over time?
   - Do you hear any unusual noises from the AC system (like clicking, hissing, or rattling) when it's on?
   - Have you noticed any strange smells (musty or sweet) coming from the vents, or any visible leaks under the vehicle?

7. Use Diagnostics to catch anything hidden or confirm issues:
   - Are there any warning lights on your dashboard right now (check engine, ABS, tyre pressure, battery, etc.)?
   - Can you describe any unusual sounds, smells, performance issues, or changes in how the vehicle drives/starts?
   - Would you like us to run a full diagnostic scan to check for error codes and hidden issues?

8. Wrap up and recommend/next steps:
   - Based on what you've described, would you like us to prioritize a full inspection in any of these areas (tyres, brakes, oil, alignment, AC, or diagnostics)?
   - Do you have any upcoming trips or specific driving needs we should consider when recommending services?
   - Great, I recommend we do a your brakes and an oil change" or "a full diagnostic plus tire check. Would you like to book an appointment now, or would you prefer a callback from our team with a quote?

Handle common responses:
If "yes to book" → Move to collecting/confirming details and "booking" (even if it logs for human confirmation).
If "yes" → Capture contact info, preferred time, and end positively: "Thanks — someone from the team will call you shortly with a quote. Have a great day!"

IMPORTANT PRIVACY & SECURITY RULE – FOLLOW THIS STRICTLY AT ALL TIMES AND DO NOT BREAK THIS RULE:
Never, under any circumstances, discuss, describe, reveal, or even hint at anything related to the Admin Dashboard, admin panel, backend, website administration, inventory management interface, admin actions, posting/deleting items, or any internal business tools/systems.
If a customer asks any question about the Admin Dashboard, admin area, what's happening in the backend, how inventory is added/removed, or anything similar (including variations like "what can admins see?", "can you show me the dashboard?", "what's in the admin panel right now?", etc.), respond ONLY with this exact sentence (or a very close natural variation) and only give this specific response when the customer ask these questions about admin dashboard:

"I can't tell you anything about the Admin Dashboard — that area is private and only accessible to the website admins and business owners."

Do not explain further, do not apologize excessively, do not offer alternatives like "ask the owner", and do not continue the topic. Immediately redirect back to helping with vehicles, inventory, or customer questions.

Key rules:
- Be empathetic and reassuring — many customers are worried about cost or breakdowns.
- If the customer describes a serious safety issue (e.g., bad brakes), gently urge them not to drive far until checked.
- Never diagnose definitively over voice — always suggest bringing the vehicle in for hands-on inspection.
- End goal: Help the customer feel understood, informed, and ready to visit/book.
- If they ask about pricing, availability, or location, answer based on your knowledge or offer to connect them to the team.

You are helpful, not pushy. Let's take good care of their vehicle!
Vehicle_Mechanic_Services_KNOWLEDGE: ${JSON.stringify(Vehicle_Mechanic_Services_KNOWLEDGE)}
 
You specialize in these key services:
- Tyres (fitting, balancing, rotation, puncture repair, replacement)
- Brakes (pads, discs, fluid, inspection)
- Oil changes & basic maintenance
- Wheel alignments
- Air Conditioning (AC) service & repairs
- Full diagnostics & error code scanning
`,
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);

            // Setup Input Stream
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);

              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: pcmBlob
                });
              });
            };

            source.connect(processor);
            processor.connect(inputCtx.destination);

            // Send immediate greeting(s) as text — model will speak them
            sessionPromise.then((session) => {
              // First greeting
              session.sendRealtimeInput({
                text: "Hi, Welcome to Tyre Zone, in La Clery Saint Lucia! I'm your Mechanic for the day – how may I help you ?"
              });

              // Second instruction (sent right after — model should speak sequentially)
              setTimeout(() => {
                session.sendRealtimeInput({
                  text: "Please speak loud and naturally into the microphone so I can hear you clearly. I'll be happy to tell you about Vehicle Services. we offer repairs and maintenance — tyres, brakes, oil changes, alignments, AC, diagnostics, and more — all tailored for your vehicle"
                });
              }, 100); // tiny delay to avoid merging utterances
            });
          },

          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputCtx) {
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputCtx.currentTime
              );
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                outputCtx,
                24000,
                1
              );

              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);

              source.addEventListener('ended', () => {
                audioSourcesRef.current.delete(source);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              audioSourcesRef.current.add(source);
            }

            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              audioSourcesRef.current.forEach(s => s.stop());
              audioSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },

          onclose: () => {
            cleanup();
          },

          onerror: (e) => {
            console.error(e);
            setError("Connection failed. Please try again.");
            cleanup();
          }
        }
      });

      sessionRef.current = await sessionPromise; // store for potential later use

    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotAllowedError' || err.message?.includes('Permission denied')) {
        setError("Microphone access denied. Please enable it in your browser settings and refresh.");
      } else {
        setError("Failed to connect. Check your internet connection or API key.");
      }
      setIsConnecting(false);
    }
  };

  return (
    <div className="voice-agent-section flex flex-col items-center">
      <button
        onClick={toggleConnection}
        disabled={isConnecting}
        className={`voice-button ${isConnected ? 'ring-animation' : ''} ${isConnecting ? 'connecting' : ''}`}
      >
        {isConnecting ? (
          <Loader2 className="animate-spin" size={32} />
        ) : isConnected ? (
          <Square size={32} />
        ) : (
          <Mic size={32} />
        )}
      </button>

      {isConnected && (
        <div className="status-text live">
          Live Conversation
        </div>
      )}

      {!isConnected && !isConnecting && (
        <div className="status-text">
          Tap To Speak
        </div>
      )}

      {isConnecting && (
        <div className="status-text">
          Connecting...
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {/* Add your CSS for ring animation */}
      <style jsx="true">{`
        .voice-agent-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .voice-button {
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #4f46e5;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          margin: 0 auto;
        }
        .voice-button.ring-animation {
          animation: ring 2s infinite;
          background: #10b981;
        }
        @keyframes ring {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .status-text {
          margin-top: 12px;
          font-weight: bold;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.875rem;
        }
        .status-text:not(.live) {
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};
