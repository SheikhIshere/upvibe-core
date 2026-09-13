import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { generateProposal, ProposalResponse } from "./lib/main";
import { CylinderInput } from "./components/Landing_page/input_box";
import { BentoDashboard } from "./components/result_page/Dashboard";

type UIState = "void" | "shift" | "engine" | "artifact";

export default function App() {
  const [uiState, setUiState] = useState<UIState>("void");
  const [inputText, setInputText] = useState("");
  const [artifact, setArtifact] = useState<ProposalResponse | null>(null);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (uiState === "void") {
      setUiState("shift");
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (inputText.trim() === "" && uiState === "shift") {
      setUiState("void");
    }
    setIsFocused(false);
  };

  const handleGenerate = async () => {
    if (!inputText.trim() || uiState === "engine") return;
    setUiState("engine");
    try {
      const result = await generateProposal(inputText);
      setArtifact(result);
      setUiState("artifact");
    } catch (err) {
      console.error(err);
      setUiState("shift");
      alert("Failed to generate. See console.");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const copyToClipboard = () => {
    if (artifact) {
      navigator.clipboard.writeText(artifact.final_proposal.proposal_text);
    }
  };

  const transitionSettings = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center bg-surface-container-lowest text-on-surface">
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-surface-container-low rounded-full blur-[120px] opacity-50"
          animate={{ opacity: uiState === "engine" ? [0.5, 0.8, 0.5] : 0.5 }}
          transition={{ repeat: uiState === "engine" ? Infinity : 0, duration: 4, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] opacity-30"
          animate={{ opacity: uiState === "engine" ? [0.3, 0.6, 0.3] : 0.3 }}
          transition={{ repeat: uiState === "engine" ? Infinity : 0, duration: 3, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl px-4 md:px-8 flex flex-col items-center relative z-10 min-h-screen">

        {/* LOGO AND HEADER SECTION */}
        <AnimatePresence mode="wait">
          {(uiState === "void" || uiState === "shift" || uiState === "engine") && (
            <motion.div
              layout
              className={`flex flex-col items-center w-full z-30 pointer-events-none ${uiState === "void" ? "mt-[25vh]" : "mt-8"
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={transitionSettings}
            >
              <motion.div
                layoutId="logo-container"
                className="w-20 h-20 mb-6 rounded-[40px] overflow-hidden glass-panel flex items-center justify-center ghost-border ambient-shadow"
              >
                <span className="material-symbols-outlined text-[40px] text-primary">architecture</span>
              </motion.div>

              {uiState === "void" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-headline text-[2.5rem] md:text-[3rem] font-bold tracking-tight text-on-surface leading-tight text-center mb-2">
                    Job Analyzer
                  </h1>
                  <p className="font-body text-base text-on-surface-variant max-w-lg text-center leading-relaxed">
                    Profiles the client, breaks down the job, and writes a <br /> <b>high-conviction</b> Upwork proposal.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN INPUT AREA */}
        <AnimatePresence>
          {uiState !== "artifact" && (
            <motion.div
              layout
              className={`w-full fixed left-1/2 -translate-x-1/2 z-40 px-4 md:px-0 max-w-3xl ${uiState === "void" ? "top-[55vh]" : "bottom-12"
                }`}
              initial={false}
              animate={{
                y: uiState === "engine" ? -30 : 0,
                scale: uiState === "engine" ? 0.98 : (isFocused ? 1.02 : 1),
              }}
              transition={transitionSettings}
            >
              <CylinderInput
                value={inputText}
                onChange={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onGenerate={handleGenerate}
                isGenerating={uiState === "engine"}
                isFocused={isFocused}
                placeholder="Drop the job details here..."
                showWordCountWarning
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* THE ARTIFACT RESULTS (BENTO DASHBOARD) */}
        <AnimatePresence mode="wait">
          {(uiState === "artifact" || (uiState === "engine" && artifact)) && (
            <motion.div
              key="artifact-results"
              className="w-full flex-grow flex flex-col mt-4"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2
                }
              }}
              exit={{
                opacity: 0,
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }}
              transition={transitionSettings}
            >
              <BentoDashboard
                artifact={artifact!}
                inputText={inputText}
                isTerminalExpanded={isTerminalExpanded}
                setIsTerminalExpanded={setIsTerminalExpanded}
                transitionSettings={transitionSettings}
                onCopy={copyToClipboard}
              />

              <footer className="h-4 flex justify-between items-center text-[9px] font-label text-[#444] uppercase tracking-[0.2em] mb-4">
                <div>[LOG]: STRATEGY_ASSEMBLY_COMPLETE</div>
                <div className="hidden sm:block">[ENGINE]: MONOLITH_V2.4</div>
                <div>© 2026 NUTCRACKERS STRATEGIC</div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* REFINEMENT INPUT AREA */}
      {(uiState === "artifact" || (uiState === "engine" && artifact)) && (
        <motion.div
          key="refinement-bar"
          layout
          className="fixed bottom-0 left-0 w-full p-6 z-50 pointer-events-none"
          initial={{ y: 100 }}
          animate={{ y: 0, scale: isFocused ? 1.02 : 1 }}
          transition={transitionSettings}
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <CylinderInput
              value={inputText}
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onGenerate={handleGenerate}
              isGenerating={uiState === "engine"}
              isFocused={isFocused}
              placeholder="Refine proposal or add instructions..."
              minHeight="min-h-[44px]"
              maxHeight="max-h-[44px]"
              extraActions={
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-white/10 transition-all focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">attach_file</span>
                </button>
              }
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
