import { TriggerBlipToolTipEventName } from "./types";

export function dispatchTriggerBlipToolTipEvent(blipId: string) {
  document.dispatchEvent(
    new CustomEvent(TriggerBlipToolTipEventName, {
      detail: { blipId },
    })
  );
}
