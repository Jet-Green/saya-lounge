export function useAiDialog() {
  let dialog = useState<boolean>(() => false)

  // preview, select, result
  let step = useState<string>(() => "preview")

  function nextStep(s: string) {
    step.value = s;
  }

  function closeDialog() {
    dialog.value = false

    if (step.value == "result") {
      step.value = 'preview'
    }
  }

  return {
    // vars
    dialog, step,
    // functions
    nextStep, closeDialog
  }
}