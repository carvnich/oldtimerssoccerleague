<template>
    <div class="min-h-screen bg-slate-100">
        <!-- Header -->
        <header class="bg-white border-b border-slate-300 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                    <RouterLink to="/" class="size-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">OTSL</RouterLink>
                    <div>
                        <h1 class="text-lg font-bold leading-tight text-slate-900">Oldtimers Soccer League</h1>
                        <p class="text-xs text-slate-500">2026 Season</p>
                    </div>
                </div>
                <nav class="flex items-center gap-1">
                    <RouterLink to="/" exact-active-class="bg-blue-600! text-white!" class="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Season</RouterLink>
                    <RouterLink to="/rules" exact-active-class="bg-blue-600! text-white!" class="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">Rules</RouterLink>
                </nav>
            </div>
        </header>

        <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-4">
            <div>
                <h2 class="text-xl font-bold text-slate-900">League Rules & Regulations</h2>
                <p class="text-sm text-slate-500 mt-1">2026 Season · Last updated December 1, 2025. This is a summary for quick reference — the official document is the binding source of truth.</p>
            </div>

            <RulesSection title="Purpose & Eligibility">
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li>Open to men and women <strong>35 years or older</strong> (turning 35 at any point during the current calendar year).</li>
                    <li>Players must be a Canadian citizen or landed immigrant with a valid health card or medical insurance.</li>
                    <li><strong>No professional or semi-professional players</strong> — players must have fully retired from professional/semi-professional play before registering.</li>
                    <li>The league promotes soccer in the Hamilton area with a focus on sportsmanship and fair competition.</li>
                </ul>
            </RulesSection>

            <RulesSection title="Team Rules">
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li>Teams must register and pay for a minimum of <strong>13 players by the 3rd Monday in February</strong>, and a minimum of 22 players by April.</li>
                    <li>Maximum roster size is <strong>25 players</strong>. New teams must start in the lowest division.</li>
                    <li>Team managers are responsible for enforcing league rules and discipline on their team.</li>
                    <li>A team unable to field 7 players within 15 minutes of kick-off forfeits the game (3–0).</li>
                    <li>Teams unable to field the required number of players <strong>three times in one season</strong> are ineligible for further play.</li>
                    <li>Home teams playing on a private field are responsible for nets, corner flags, and field markings — failure results in a fine and a 15-minute window to comply, or a forfeit.</li>
                    <li>All teams must have <strong>two sets of uniforms in different colours</strong>. The home team changes if there is a colour conflict.</li>
                    <li>Home team manager must report game results by <strong>6 p.m. on Sunday</strong> (or the next day for midweek games).</li>
                    <li>Team sheets must be delivered to the referee <strong>15 minutes before kick-off</strong> along with at least 2 game balls.</li>
                    <li>Only registered players and team officials listed on the game sheet may sit on the bench.</li>
                    <li><strong>Playing an ineligible player</strong> results in all affected games being defaulted, a 3-point deduction, and a fine of $500.</li>
                    <li>A team <strong>knowingly playing a suspended player</strong> forfeits the game.</li>
                    <li>A forfeited game is recorded as a <strong>3–0 loss</strong>. The forfeiting team is also charged field and referee fees.</li>
                </ul>
            </RulesSection>

            <RulesSection title="Player Registration">
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li>Players can only be registered with <strong>one HDOTSL team at a time</strong>.</li>
                    <li>All players must be registered and approved by <strong>July 31st</strong> to be eligible for the current season and Cup competition.</li>
                    <li>New players must provide two pieces of original ID (birth certificate, passport, driver's licence, or photo health card) plus a photo.</li>
                    <li>Transfers during the season require at least <strong>one week</strong> to process and must be approved online by both team managers before the player plays.</li>
                    <li>Teams may <strong>deregister a maximum of 3 players</strong> per season. Further deregistrations require written justification approved by the executive.</li>
                    <li>Player transfer fee: <strong>$50</strong>. Deregistration fee: <strong>$25</strong>.</li>
                    <li>All players must wear the same shirt number as listed on their official game sheet throughout the season.</li>
                </ul>
            </RulesSection>

            <RulesSection title="Game Rules">
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li>Games are <strong>90 minutes</strong> (2 × 45-minute halves). All FIFA rules apply except where noted below.</li>
                    <li><strong>Offside rules apply</strong> in all divisions.</li>
                    <li>
                        <strong>Sliding tackles are not permitted.</strong>
                        <button class="inline-flex shrink-0 align-middle mx-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" aria-label="Learn more about the sliding tackle rule" @click="slidingModalOpen = true">
                            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                        </button>
                        Sliding to collect a ball with no opposing player challenging is allowed.
                    </li>
                    <li>Any player (including the goalkeeper) who receives a <strong>yellow card must be substituted</strong> before play resumes and must sit for a cool-off period at the referee's discretion.</li>
                    <li>A <strong>red-carded player cannot be replaced</strong> — the team plays short.</li>
                    <li>Substitutions may be made at any stoppage of play from the centre of the field on the bench side, at the referee's discretion. There is no limit on the number of substitutions or re-entries.</li>
                    <li>If a game reaches <strong>75+ minutes played</strong>, the result stands even if play is stopped early.</li>
                    <li>If a game is abandoned before 75 minutes (except for referee assault or a team abandoning), it is rescheduled — costs split between both teams.</li>
                    <li>A game abandoned due to <strong>referee assault or a team abandoning</strong> is awarded 3–0 against the offending team.</li>
                    <li>Schedule changes are limited to <strong>2 per team per season</strong> and must be approved by the League Scheduler. Deadline for rescheduling is <strong>April 15</strong>.</li>
                    <li>Official complaints must be submitted in writing within <strong>48 hours</strong> of the game (excluding weekends and holidays), accompanied by a <strong>$100 fee</strong>.</li>
                </ul>
            </RulesSection>

            <RulesSection title="Standings & Tiebreakers">
                <p class="text-sm text-slate-600 mb-3">When teams are level on points at season's end, ties are broken in this order:</p>
                <ol class="flex flex-col gap-1.5 text-sm text-slate-700 list-decimal list-outside ml-4">
                    <li>Head-to-head points (games between tied teams)</li>
                    <li>Head-to-head goal difference</li>
                    <li>Head-to-head goals scored</li>
                    <li>Overall goal difference</li>
                    <li>Overall goals scored</li>
                    <li>Overall wins</li>
                    <li>Fewest red cards</li>
                    <li>Fewest yellow cards</li>
                    <li>Draw</li>
                </ol>
            </RulesSection>

            <RulesSection title="Promotion & Relegation">
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li><strong>First-place teams</strong> in all divisions except Division A are promoted at the end of the season.</li>
                    <li><strong>Last-place teams</strong> in all divisions are relegated to the next lower division.</li>
                    <li>A team that declines promotion may face a point deduction the following season.</li>
                    <li>If a spot opens at the start of a new season, recently relegated teams from that division have priority (by prior season standings) to return.</li>
                </ul>
            </RulesSection>

            <RulesSection title="Cup Competition">
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li>Cup bracket is seeded based on end-of-season league standings within each division — 1st plays last, 2nd plays 2nd-last, etc.</li>
                    <li>All teams in each division participate. If a division has an odd number of teams, a preliminary round is played first.</li>
                    <li>If a Cup game is tied at the end of regulation, it goes directly to <strong>penalty kicks</strong> — no extra time.</li>
                </ul>
            </RulesSection>

            <RulesSection title="Discipline">
                <p class="text-sm text-slate-600 mb-3">Discipline hearings are held on the <strong>last Tuesday of each month</strong> by the HDOTSL Discipline Chairman and Committee.</p>
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li>Fines and suspensions must be resolved before a player or official is reinstated — unpaid fines result in indefinite suspension.</li>
                    <li>All fines must be paid within <strong>7 days</strong> of posting on the official Discipline website.</li>
                </ul>

                <p class="text-sm font-semibold text-slate-700 mt-4 mb-2">Misconduct (physical altercations, severe abuse)</p>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Offence</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Suspension</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Fine</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">1st offence</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">1–6 months</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$250</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">2nd offence</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3–12 months</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$500</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3rd offence</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Lifetime ban</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">—</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p class="text-sm font-semibold text-slate-700 mt-4 mb-2">Red card dismissals — players</p>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Code</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Offence</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Games</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Fine</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R1</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Serious foul play</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R2</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Violent conduct</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Biting or spitting (minimum)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R4</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Denying a goal by handball (free kick restart)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">2</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R5</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Denying an obvious goal</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">2</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R6</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Denying a goal-scoring opportunity (penalty restart)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R7</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Offensive / abusive language or gestures (minimum)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R8</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Second yellow in same match</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">1</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R9</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Playing as an ineligible player</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">2</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Y3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3 accumulated yellow cards</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">1</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p class="text-sm font-semibold text-slate-700 mt-4 mb-2">Red card dismissals — team officials</p>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Code</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Offence</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Games</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Fine</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R1</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Delaying restart (holding ball, kicking it away)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">1</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R2</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Leaving technical area to show dissent to a match official</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">1</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Entering the field to confront a match official or interfere with play</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">2</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R4</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Physical or aggressive behaviour toward any person</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R5</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Second caution in same match</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">1</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">R6</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Offensive / abusive language or gestures (minimum)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">3</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </RulesSection>

            <RulesSection title="Fees & Fines Summary">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Item</th>
                                <th class="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-50 border border-slate-200">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Performance bond (new team)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$500</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Performance bond (existing team)</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$350</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Missing monthly managers meeting</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Missing annual managers meeting</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$75</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Playing an ineligible player</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$500</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Failing to report game score</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$20</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Referee fee — head referee</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$80</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Referee fee — assistant referee</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$60</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Official complaint filing fee</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$100</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Standard team fine</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$150</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Standard player fine</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$150</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Player transfer fee</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$50</td>
                            </tr>
                            <tr>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">Deregistration fee</td>
                                <td class="px-3 py-2 text-slate-700 border border-slate-200 hover:bg-slate-50">$25</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </RulesSection>

            <RulesSection title="Referee Guidelines">
                <ul class="flex flex-col gap-1.5 text-sm text-slate-700 list-disc list-outside ml-4">
                    <li>All referee appointments are made by the League or a League-appointed director.</li>
                    <li>Referee fees are paid <strong>equally by both teams before the game starts</strong> (except Cup finals).</li>
                    <li>Referees must arrive at least <strong>20 minutes before kick-off</strong> to inspect the field and ensure a prompt start.</li>
                    <li>A game without a referee may still stand if <strong>both coaches/managers sign the back of the team sheet</strong>. If they disagree, the League Scheduler arranges a new time and field.</li>
                    <li>If a game is cancelled due to weather or field conditions, the referee is paid <strong>half the game fee</strong> by the league after waiting at least 25 minutes on-site.</li>
                    <li>All caution, send-off, and incident reports must be entered into the League system <strong>within 48 hours</strong> of the game.</li>
                    <li>Referee dress code follows CSA standards (black first, yellow second, red third). Be prepared to adjust if teams are wearing black.</li>
                    <li>Late cancellations (less than 48 hours before the game) are unacceptable except in extreme emergencies.</li>
                </ul>
            </RulesSection>
        </div>

        <!-- Sliding tackle modal -->
        <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-200" leave-to-class="opacity-0">
            <div v-if="slidingModalOpen" class="fixed inset-0 z-50 bg-white flex flex-col">
                <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
                    <h3 class="text-base font-bold text-slate-900">Why sliding tackles are banned</h3>
                    <button class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" @click="slidingModalOpen = false" aria-label="Close">
                        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                </div>
                <div class="overflow-y-auto flex-1">
                    <div class="max-w-2xl mx-auto px-5 py-4 flex flex-col gap-4 text-slate-700">
                        <div>
                            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Why the slide tackle itself is the foul</p>
                            <p class="text-sm">
                                In recreational leagues that prohibit slide tackling, the rule exists purely as a safety measure — over-35 players are more susceptible to injury, and slide tackles carry a high risk of leg and knee contact. The league has pre-determined that the action itself is dangerous, so referees don't need to judge whether it was dangerous in the moment. The whistle blows the
                                instant a player goes to ground in a tackling motion.
                            </p>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Why contact doesn't matter</p>
                            <p class="text-sm">Under the Laws of the Game (FIFA), a player can be penalized for <em>attempting</em> a foul, not just completing one. The slide tackle ban follows the same logic — the attempt is enough. The opponent doesn't need to be tripped, hurt, or even inconvenienced.</p>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Why it's a direct free kick</p>
                            <p class="text-sm">An indirect free kick covers technical offenses (offside, goalkeeper backpass). A direct free kick is awarded for physical fouls and prohibited actions against an opponent. A slide tackle ban falls into that category.</p>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Why it becomes a penalty kick inside the box</p>
                            <p class="text-sm">Any offense that would be a direct free kick outside the box is automatically upgraded to a penalty kick when committed by a defending player inside their own area.</p>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Why a card may also be issued</p>
                            <p class="text-sm">A foul and a card are two separate decisions. The foul stops play and sets the restart. The card is the referee's disciplinary response — was the tackle careless (no card), reckless (yellow), or using excessive force (red)? A clearly accidental slide might just be a free kick, while a late or two-footed challenge could earn a yellow or red on top.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Scroll to top -->
        <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-200" leave-to-class="opacity-0">
            <button v-if="showScrollTop" class="fixed bottom-6 right-6 size-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer z-50" @click="scrollToTop" aria-label="Scroll to top">
                <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6" />
                </svg>
            </button>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

const slidingModalOpen = ref(false);

const showScrollTop = ref(false);
function onScroll() {
    showScrollTop.value = window.scrollY > 300;
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "instant" });
}
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const RulesSection = defineComponent({
    props: { title: { type: String, required: true } },
    setup(props, { slots }) {
        return () => h("section", { class: "rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm" }, [h("div", { class: "px-4 py-3 border-b border-slate-300 bg-slate-50" }, [h("h2", { class: "text-base font-bold text-slate-900" }, props.title)]), h("div", { class: "px-4 py-4" }, slots.default?.())]);
    },
});

import { defineComponent, h } from "vue";
</script>
