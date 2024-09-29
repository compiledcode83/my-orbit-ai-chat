import { z } from "zod";

export const autoAIActivityIndicatorSchema = z.object({
  action: z.literal("auto_ai_activity_indicator"),
  data: z.object({
    info: z.enum(["activate_send_button", "deactivate_send_button"]),
  }),
});

type AutoAIActivityIndicatorInterface = z.infer<
  typeof autoAIActivityIndicatorSchema
>;

export type { AutoAIActivityIndicatorInterface };
