async function runInSequence (tasks, state) {
  for (let task in tasks) {
    let task = tasks[i]
    state = (task instanceof Array)
      ? await runInParallel(task, state)
      : await runAsPromise(task, state) }
  return state }

