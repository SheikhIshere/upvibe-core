import { Type, Schema } from "@google/genai";

export const output_schema: Schema = {
  type: Type.OBJECT,
  properties: {
    job_breakdown: {
      type: Type.OBJECT,
      properties: {
        precise_requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
        deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
        implied_tech_stack: { type: Type.ARRAY, items: { type: Type.STRING } },
        hidden_priorities: { type: Type.ARRAY, items: { type: Type.STRING } },
        risks_and_edge_cases: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["precise_requirements", "deliverables", "implied_tech_stack", "hidden_priorities", "risks_and_edge_cases"]
    },
    best_portfolio_match: {
      type: Type.OBJECT,
      properties: {
        project_title: { type: Type.STRING },
        justification_for_fit: { type: Type.STRING },
        proof_points_to_highlight: { type: Type.ARRAY, items: { type: Type.STRING } },
        elements_to_avoid_mentioning: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["project_title", "justification_for_fit", "proof_points_to_highlight", "elements_to_avoid_mentioning"]
    },
    time_estimate: {
      type: Type.OBJECT,
      properties: {
        fast_estimate: { type: Type.STRING },
        realistic_estimate: { type: Type.STRING },
        timeline_risk_factors: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["fast_estimate", "realistic_estimate", "timeline_risk_factors"]
    },
    client_analysis: {
      type: Type.OBJECT,
      properties: {
        behavior_and_hiring_signals: { type: Type.ARRAY, items: { type: Type.STRING } },
        red_or_green_flags: { type: Type.ARRAY, items: { type: Type.STRING } },
        overall_confidence_level: { type: Type.STRING }
      },
      required: ["behavior_and_hiring_signals", "red_or_green_flags", "overall_confidence_level"]
    },
    final_proposal: {
      type: Type.OBJECT,
      properties: {
        proposal_text: { type: Type.STRING },
        character_count: { type: Type.INTEGER }
      },
      required: ["proposal_text", "character_count"]
    }
  },
  required: ["job_breakdown", "best_portfolio_match", "time_estimate", "client_analysis", "final_proposal"]
};
