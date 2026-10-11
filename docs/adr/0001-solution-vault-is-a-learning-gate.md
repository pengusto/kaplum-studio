# Solution vault is a learning gate, not access control

The owner chose a numeric solution reveal as a teaching intervention: learners should try a task before seeing its prepared solution code, but technically skilled learners may discover shipped source. The normal UI shows the target result while withholding solution code until reveal; this decision does not introduce server-side secrecy or accounts. Unlike confidential server-only solutions, shipped solutions may be inspectable in browser assets, source repositories or distributed materials, and the UI must not describe the gate as secure protection.

The owner refined reveal scope to cumulative course stages: a valid code for stage N reveals N and all earlier stages. Reveal state persists locally until explicitly relocked; courses remain freely navigable and self-reported progress is separate. Code distribution uses a teacher-facing sheet, with no admin mode in initial scope.
