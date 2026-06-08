<template>
    <div class="min-h-screen bg-slate-100" ref="pageEl">
        <!-- Header -->
        <header class="bg-white border-b border-slate-300 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                    <div class="size-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">OTSL</div>
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

        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
            <!-- Division toggle -->
            <div class="flex flex-wrap justify-center gap-2">
                <button
                    v-for="option in store.divisionOptions"
                    :key="option.value"
                    class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer"
                    :class="store.division === option.value ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50'"
                    @click="
                        store.division = option.value;
                        store.selectedTeam = '';
                    "
                >
                    {{ option.label }}
                </button>
            </div>

            <!-- Season type toggle -->
            <div class="flex flex-wrap justify-center gap-2">
                <button
                    v-for="option in store.seasonOptions"
                    :key="option.value"
                    class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer"
                    :class="store.seasonType === option.value ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50'"
                    @click="
                        store.seasonType = option.value;
                        store.selectedTeam = '';
                    "
                >
                    {{ option.label }}
                </button>
            </div>

            <!-- Loading -->
            <div v-if="store.pending" class="flex justify-center py-20">
                <svg class="size-10 animate-spin text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>

            <!-- Error -->
            <div v-else-if="store.error" class="text-red-500 text-center py-10">{{ store.error }}</div>

            <template v-else>
                <!-- Schedule -->
                <section class="rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm">
                    <div class="px-4 py-3 border-b border-slate-300 bg-slate-50">
                        <h2 class="text-base font-bold text-slate-900">Schedule</h2>
                    </div>

                        <!-- Team filter -->
                        <div class="px-4 py-3 border-b border-slate-300 bg-slate-50 flex gap-2 items-center">
                            <div class="relative flex-1" v-click-outside="() => (filterOpen = false)">
                                <button class="w-full flex items-center justify-between rounded-lg border border-slate-300 bg-white pl-3 pr-3 py-2.5 text-sm text-slate-700 cursor-pointer" @click="filterOpen = !filterOpen">
                                    <span :class="store.selectedTeam ? 'text-slate-900' : 'text-slate-400'">{{ store.selectedTeam || 'All teams' }}</span>
                                    <svg :class="['size-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2', filterOpen ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                                <div v-show="filterOpen" class="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-slate-200 rounded-lg shadow-lg overflow-y-auto max-h-64">
                                    <button class="w-full text-left px-4 py-2.5 text-sm text-slate-400 hover:bg-slate-50 cursor-pointer" @click="store.selectedTeam = ''; filterOpen = false">All teams</button>
                                    <button v-for="team in teamOptions" :key="team" class="w-full text-left px-4 py-2.5 text-sm cursor-pointer" :class="store.selectedTeam === team ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700 hover:bg-slate-50'" @click="store.selectedTeam = team; filterOpen = false">{{ team }}</button>
                                </div>
                            </div>
                            <button v-if="store.selectedTeam" class="shrink-0 px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-600 hover:bg-slate-50 cursor-pointer" @click="store.selectedTeam = ''">Clear</button>
                        </div>

                        <!-- Date-grouped schedule -->
                        <div class="p-4 flex flex-col gap-4">
                            <div v-if="scheduleByDate.length === 0" class="py-6 text-center text-sm text-slate-500">No games found.</div>
                            <div v-for="dateGroup in scheduleByDate" :key="dateGroup.date" class="rounded-lg border border-slate-200 overflow-hidden">
                                <div class="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                                    <span class="text-sm font-semibold text-slate-700">{{ dateGroup.date }}</span>
                                    <TrophyIcon v-if="dateGroup.games.some((g) => g.schedule_type === 'Spence Cup')" />
                                </div>
                                <div class="divide-y divide-slate-100">
                                    <div v-for="game in dateGroup.games" :key="gameKey(game)" class="grid grid-cols-3 items-center p-4 gap-3">
                                        <span class="text-xs font-medium text-slate-900 text-right leading-tight">{{ game.home_team }}</span>
                                        <div class="shrink-0 text-center">
                                            <template v-if="game.home_team_score !== null && game.away_team_score !== null">
                                                <span class="font-mono font-bold text-base text-slate-900">{{ game.home_team_score }} – {{ game.away_team_score }}</span>
                                            </template>
                                            <template v-else>
                                                <div class="text-sm font-medium text-slate-700">{{ game.game_time }}</div>
                                                <a v-if="getFieldUrl(game.field_name)" :href="getFieldUrl(game.field_name)!" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-600 hover:underline leading-tight">{{ game.field_name }}</a>
                                                <div v-else class="text-xs text-slate-400 leading-tight">
                                                    {{ game.field_name }}
                                                </div>
                                            </template>
                                        </div>
                                        <span class="text-xs font-medium text-slate-900 leading-tight">{{ game.away_team }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>

                <!-- Standings -->
                <section class="rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm">
                    <div class="px-4 py-3 border-b border-slate-300 bg-slate-50">
                        <h2 class="text-base font-bold text-slate-900">Standings</h2>
                    </div>

                        <!-- Desktop table -->
                        <div class="hidden sm:block overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead class="bg-slate-50 border-b border-slate-300">
                                    <tr>
                                        <th v-for="col in standingsColumns" :key="col.key" class="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider text-left">
                                            {{ col.label }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-200">
                                    <tr v-for="team in store.filteredStandings" :key="team.team_name" class="hover:bg-slate-50">
                                        <td v-for="col in standingsColumns" :key="col.key" class="px-4 py-3 text-slate-700">
                                            {{ team[col.key as keyof typeof team] }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Mobile table -->
                        <div class="sm:hidden overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead class="bg-slate-50 border-b border-slate-300">
                                    <tr>
                                        <th class="px-3 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider text-left w-6">#</th>
                                        <th class="px-3 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider text-left">Team</th>
                                        <th class="px-2 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">PL</th>
                                        <th class="px-2 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">W</th>
                                        <th class="px-2 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">L</th>
                                        <th class="px-2 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">GD</th>
                                        <th class="px-2 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">PTS</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    <tr v-for="team in store.filteredStandings" :key="team.team_name" class="hover:bg-slate-50">
                                        <td class="px-3 py-2.5 text-xs text-slate-400 font-semibold text-center">{{ team.standing }}</td>
                                        <td class="px-3 py-2.5 text-xs font-medium text-slate-900">{{ team.team_name }}</td>
                                        <td class="px-2 py-2.5 text-xs text-slate-600 text-center">{{ team.games_played }}</td>
                                        <td class="px-2 py-2.5 text-xs text-slate-600 text-center">{{ team.wins_total }}</td>
                                        <td class="px-2 py-2.5 text-xs text-slate-600 text-center">{{ team.loses_total }}</td>
                                        <td class="px-2 py-2.5 text-xs text-slate-600 text-center">{{ team.goals_diff }}</td>
                                        <td class="px-2 py-2.5 text-xs font-bold text-slate-900 text-center">{{ team.points_total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </section>

                <!-- Top Scorers -->
                <section class="rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm">
                    <div class="px-4 py-3 border-b border-slate-300 bg-slate-50">
                        <h2 class="text-base font-bold text-slate-900">Top Scorers</h2>
                    </div>

                        <div v-if="store.filteredScorers.length === 0" class="px-4 py-6 text-center text-sm text-slate-500">No scorer data available.</div>
                        <template v-for="divGroup in scorersByDivision" :key="divGroup.division_id">
                            <div v-if="scorersByDivision.length > 1" class="px-4 py-2 bg-slate-100 border-b border-slate-200">
                                <span class="text-xs font-semibold text-slate-600 uppercase tracking-wider">{{ divGroup.division_name }}</span>
                            </div>
                            <div class="divide-y divide-slate-100 border-b border-slate-200 last:border-b-0">
                                <div v-for="scorer in divGroup.scorers" :key="scorer.player_id" class="grid grid-cols-3 items-center px-4 py-2 gap-3">
                                    <span class="text-sm text-slate-900">{{ scorer.player_fname }} {{ scorer.player_lname }}</span>
                                    <span class="text-sm font-bold text-blue-600 text-center">{{ scorer.tot_goals }}</span>
                                    <span class="text-xs text-slate-500 text-right leading-tight">{{ scorer.team_name }}</span>
                                </div>
                            </div>
                        </template>
                </section>
            </template>
        </div>

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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

const vClickOutside = {
    mounted(el: HTMLElement & { _co?: (e: Event) => void }, binding: { value: () => void }) {
        el._co = (e: Event) => { if (!el.contains(e.target as Node)) binding.value(); };
        document.addEventListener("pointerdown", el._co);
    },
    unmounted(el: HTMLElement & { _co?: (e: Event) => void }) {
        if (el._co) document.removeEventListener("pointerdown", el._co);
    },
};
import { useLeagueStore } from "@/stores/league";
import { useFieldLinks } from "@/composables/useFieldLinks";
import TrophyIcon from "@/components/TrophyIcon.vue";
import type { Game } from "@/types/league";

const store = useLeagueStore();
const { getFieldUrl } = useFieldLinks();

onMounted(() => store.load());

const filterOpen = ref(false);

const showScrollTop = ref(false);

function onScroll() {
    showScrollTop.value = window.scrollY > 300;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "instant" });
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

function gameKey(game: Game) {
    return `${game.game_date}-${game.home_team}-${game.away_team}`;
}

const teamOptions = computed(() => {
    const teams = new Set(store.filteredSchedule.flatMap((g) => [g.home_team, g.away_team]));
    return [...teams].sort();
});

const filteredSchedule = computed(() => {
    if (!store.selectedTeam) return store.filteredSchedule;
    return store.filteredSchedule.filter((g) => g.home_team === store.selectedTeam || g.away_team === store.selectedTeam);
});

const scheduleByDate = computed(() => {
    const groups = new Map<string, Game[]>();
    for (const game of filteredSchedule.value) {
        if (!groups.has(game.game_date)) groups.set(game.game_date, []);
        groups.get(game.game_date)!.push(game);
    }
    return [...groups.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, games]) => ({
            date,
            games: [...games].sort((a, b) => (a.game_time ?? "").localeCompare(b.game_time ?? "")),
        }));
});

const scorersByDivision = computed(() => {
    const groups = new Map<string, { division_id: string; division_name: string; scorers: typeof store.filteredScorers }>();
    for (const scorer of store.filteredScorers) {
        if (!groups.has(scorer.division_id)) {
            groups.set(scorer.division_id, {
                division_id: scorer.division_id,
                division_name: scorer.division_name,
                scorers: [],
            });
        }
        groups.get(scorer.division_id)!.scorers.push(scorer);
    }
    return [...groups.values()];
});

const standingsColumns = [
    { key: "standing", label: "#" },
    { key: "team_name", label: "Team" },
    { key: "games_played", label: "GP" },
    { key: "wins_total", label: "W" },
    { key: "draws_total", label: "D" },
    { key: "loses_total", label: "L" },
    { key: "goals_for", label: "GF" },
    { key: "goals_against", label: "GA" },
    { key: "goals_diff", label: "GD" },
    { key: "points_total", label: "PTS" },
];
</script>
