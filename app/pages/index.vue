<template>
    <div class="min-h-screen bg-slate-100">
        <!-- Header -->
        <header class="bg-white border-b border-slate-300 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
                <div
                    class="size-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xs shrink-0"
                >
                    OTSL
                </div>
                <div>
                    <h1 class="text-lg font-bold leading-tight text-slate-900">
                        Oldtimers Soccer League
                    </h1>
                    <p class="text-xs text-slate-500">2026 Season</p>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
            <!-- Division toggle -->
            <div class="flex flex-wrap justify-center gap-2">
                <button
                    v-for="option in store.divisionOptions"
                    :key="option.value"
                    class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                    :class="
                        store.division === option.value
                            ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
                            : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50'
                    "
                    @click="
                        store.division = option.value;
                        selectedTeam = null;
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
                    class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                    :class="
                        store.seasonType === option.value
                            ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
                            : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50'
                    "
                    @click="
                        store.seasonType = option.value;
                        selectedTeam = null;
                    "
                >
                    {{ option.label }}
                </button>
            </div>

            <!-- Loading -->
            <div v-if="store.pending" class="flex justify-center py-20">
                <UIcon
                    name="i-lucide-loader-circle"
                    class="size-10 animate-spin text-primary-500"
                />
            </div>

            <!-- Error -->
            <div v-else-if="store.error" class="text-red-500 text-center py-10">
                Failed to load data. Please try again later.
            </div>

            <template v-else>
                <!-- Schedule -->
                <section
                    class="rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm"
                >
                    <UCollapsible default-open>
                        <template #default="{ open }">
                            <div class="px-4 py-3 border-b border-slate-300 bg-slate-50">
                                <UButton
                                    color="neutral"
                                    variant="ghost"
                                    block
                                    class="justify-between w-full px-0 hover:bg-transparent active:bg-transparent"
                                    :trailing-icon="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                                    :ui="{ trailingIcon: 'transition-transform duration-200' }"
                                >
                                    <h2 class="text-base font-bold text-slate-900">Schedule</h2>
                                </UButton>
                            </div>
                        </template>

                        <template #content>
                        <div class="px-4 py-3 border-b border-slate-300 bg-slate-50 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                            <USelectMenu
                                v-model="selectedTeam"
                                :items="teamOptions"
                                placeholder="Filter by team"
                                class="w-full sm:w-56"
                                clear
                                :ui="{
                                    base: 'bg-white border border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-primary-500 text-slate-800',
                                    placeholder: 'text-slate-400',
                                    content:
                                        'bg-white border border-slate-300 shadow-lg',
                                    item: 'text-slate-700 data-highlighted:not-data-disabled:text-slate-900 data-highlighted:not-data-disabled:before:bg-slate-100',
                                }"
                            />
                        </div>
                    <!-- Desktop table -->
                    <div class="hidden sm:block">
                        <UTable
                            :data="filteredSchedule"
                            :columns="scheduleColumns"
                            class="w-full"
                            :ui="{
                                thead: 'bg-slate-50',
                                th: 'px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-300',
                                td: 'px-4 py-3 text-sm text-slate-700 border-b border-slate-200',
                                tbody: '[&>tr]:hover:bg-slate-50 divide-y divide-slate-200',
                            }"
                        >
                            <template #field_name-cell="{ row }">
                                <a
                                    v-if="getFieldUrl(row.original.field_name)"
                                    :href="
                                        getFieldUrl(row.original.field_name)!
                                    "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-primary-600 font-medium hover:underline"
                                >
                                    {{ row.original.field_name }}
                                </a>
                                <span v-else class="text-slate-700">{{
                                    row.original.field_name
                                }}</span>
                            </template>
                            <template #result-cell="{ row }">
                                <span
                                    v-if="
                                        row.original.home_team_score !== null &&
                                        row.original.away_team_score !== null
                                    "
                                    class="font-mono font-semibold text-slate-900"
                                >
                                    {{ row.original.home_team_score }} –
                                    {{ row.original.away_team_score }}
                                </span>
                                <span v-else class="text-slate-400 text-xs"
                                    >Scheduled</span
                                >
                            </template>
                        </UTable>
                    </div>

                    <!-- Mobile expandable rows -->
                    <div class="sm:hidden">
                        <div
                            v-if="filteredSchedule.length === 0"
                            class="px-4 py-6 text-center text-sm text-slate-500"
                        >
                            No games found.
                        </div>
                        <div
                            v-for="game in filteredSchedule"
                            :key="gameKey(game)"
                            class="border-b border-slate-200 last:border-b-0"
                        >
                            <!-- Summary row -->
                            <button
                                class="w-full grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                                @click="toggleGame(game)"
                            >
                                <!-- Col 1: Team names + scores stacked -->
                                <div class="min-w-0">
                                    <div class="flex items-center justify-between gap-2">
                                        <p class="font-medium text-sm text-slate-900 leading-tight truncate">{{ game.home_team }}</p>
                                        <span
                                            v-if="game.home_team_score !== null"
                                            class="font-mono font-semibold text-sm text-slate-900 shrink-0"
                                        >{{ game.home_team_score }}</span>
                                        <span v-else class="text-xs text-slate-300 shrink-0">—</span>
                                    </div>
                                    <div class="flex items-center justify-between gap-2 mt-1">
                                        <p class="font-medium text-sm text-slate-900 leading-tight truncate">{{ game.away_team }}</p>
                                        <span
                                            v-if="game.away_team_score !== null"
                                            class="font-mono font-semibold text-sm text-slate-900 shrink-0"
                                        >{{ game.away_team_score }}</span>
                                        <span v-else class="text-xs text-slate-300 shrink-0">—</span>
                                    </div>
                                </div>
                                <!-- Col 2: Date and time -->
                                <div class="shrink-0 text-right">
                                    <p class="text-xs text-slate-700 font-medium whitespace-nowrap">{{ game.game_date }}</p>
                                    <p class="text-xs text-slate-500 mt-0.5 whitespace-nowrap">{{ game.game_time }}</p>
                                </div>
                                <!-- Col 3: Chevron -->
                                <div class="shrink-0">
                                    <UIcon
                                        :name="expandedGames.has(gameKey(game)) ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                                        class="size-4 text-slate-400"
                                    />
                                </div>
                            </button>

                            <!-- Expanded detail rows -->
                            <div
                                v-if="expandedGames.has(gameKey(game))"
                                class="bg-slate-50 border-t border-slate-200"
                            >
                                <div class="flex border-b border-slate-200 last:border-b-0">
                                    <span class="w-24 shrink-0 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Field</span>
                                    <span class="px-4 py-2 text-sm">
                                        <a
                                            v-if="getFieldUrl(game.field_name)"
                                            :href="getFieldUrl(game.field_name)!"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-primary-600 hover:underline"
                                        >
                                            {{ game.field_name }}
                                        </a>
                                        <span v-else class="text-slate-800">{{ game.field_name }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </template>
                    </UCollapsible>
                </section>

                <!-- Standings -->
                <section
                    class="rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm"
                >
                    <div
                        class="px-4 py-3 border-b border-slate-300 bg-slate-50"
                    >
                        <h2 class="text-base font-bold text-slate-900">
                            Standings
                        </h2>
                    </div>

                    <!-- Desktop table -->
                    <div class="hidden sm:block">
                        <UTable
                            :data="store.filteredStandings"
                            :columns="standingsColumns"
                            class="w-full"
                            :ui="{
                                thead: 'bg-slate-50',
                                th: 'px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-300',
                                td: 'px-4 py-3 text-sm text-slate-700 border-b border-slate-200',
                                tbody: '[&>tr]:hover:bg-slate-50 divide-y divide-slate-200',
                            }"
                        />
                    </div>

                    <!-- Mobile expandable rows -->
                    <div class="sm:hidden">
                        <div
                            v-if="store.filteredStandings.length === 0"
                            class="px-4 py-6 text-center text-sm text-slate-500"
                        >
                            No standings available.
                        </div>
                        <div
                            v-for="team in store.filteredStandings"
                            :key="team.team_name"
                            class="border-b border-slate-200 last:border-b-0"
                        >
                            <!-- Summary row -->
                            <button
                                class="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                                @click="toggleStanding(team)"
                            >
                                <div class="flex items-center gap-3">
                                    <span
                                        class="text-xs font-bold w-5 text-center text-slate-400"
                                        >{{ team.standing }}</span
                                    >
                                    <p
                                        class="font-medium text-sm text-slate-900"
                                    >
                                        {{ team.team_name }}
                                    </p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span
                                        class="text-sm font-bold text-primary-600"
                                        >{{ team.points_total }}
                                        <span
                                            class="font-normal text-xs text-slate-400"
                                            >PTS</span
                                        ></span
                                    >
                                    <UIcon
                                        :name="
                                            expandedStandings.has(
                                                team.team_name,
                                            )
                                                ? 'i-lucide-chevron-up'
                                                : 'i-lucide-chevron-down'
                                        "
                                        class="size-4 text-slate-400"
                                    />
                                </div>
                            </button>

                            <!-- Expanded detail rows -->
                            <div
                                v-if="expandedStandings.has(team.team_name)"
                                class="bg-slate-50 border-t border-slate-200"
                            >
                                <div
                                    v-for="stat in [
                                        {
                                            label: 'Games Played',
                                            value: team.games_played,
                                        },
                                        {
                                            label: 'Wins',
                                            value: team.wins_total,
                                        },
                                        {
                                            label: 'Draws',
                                            value: team.draws_total,
                                        },
                                        {
                                            label: 'Losses',
                                            value: team.loses_total,
                                        },
                                        {
                                            label: 'Goals For',
                                            value: team.goals_for,
                                        },
                                        {
                                            label: 'Goals Against',
                                            value: team.goals_against,
                                        },
                                        {
                                            label: 'Goal Diff',
                                            value: team.goals_diff,
                                        },
                                    ]"
                                    :key="stat.label"
                                    class="flex border-b border-slate-200 last:border-b-0"
                                >
                                    <span
                                        class="w-36 shrink-0 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                        >{{ stat.label }}</span
                                    >
                                    <span
                                        class="px-4 py-2 text-sm text-slate-800"
                                        >{{ stat.value }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Top Scorers -->
                <section
                    class="rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm"
                >
                    <div
                        class="px-4 py-3 border-b border-slate-300 bg-slate-50"
                    >
                        <h2 class="text-base font-bold text-slate-900">
                            Top Scorers
                        </h2>
                    </div>

                    <!-- Desktop table -->
                    <div class="hidden sm:block">
                        <UTable
                            :data="store.filteredScorers"
                            :columns="scorersColumns"
                            class="w-full"
                            :ui="{
                                thead: 'bg-slate-50',
                                th: 'px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-300',
                                td: 'px-4 py-3 text-sm text-slate-700 border-b border-slate-200',
                                tbody: '[&>tr]:hover:bg-slate-50 divide-y divide-slate-200',
                            }"
                        />
                    </div>

                    <!-- Mobile expandable rows -->
                    <div class="sm:hidden">
                        <div
                            v-if="store.filteredScorers.length === 0"
                            class="px-4 py-6 text-center text-sm text-slate-500"
                        >
                            No scorer data available.
                        </div>
                        <div
                            v-for="scorer in store.filteredScorers"
                            :key="scorer.player_name"
                            class="border-b border-slate-200 last:border-b-0"
                        >
                            <!-- Summary row -->
                            <button
                                class="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                                @click="toggleScorer(scorer)"
                            >
                                <div class="flex items-center gap-3">
                                    <span
                                        class="text-xs font-bold w-5 text-center text-slate-400"
                                        >{{ scorer.standing }}</span
                                    >
                                    <div>
                                        <p
                                            class="font-medium text-sm text-slate-900"
                                        >
                                            {{ scorer.player_name }}
                                        </p>
                                        <p class="text-xs text-slate-500">
                                            {{ scorer.team_name }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span
                                        class="text-sm font-bold text-primary-600"
                                        >{{ scorer.goals }}
                                        <span
                                            class="font-normal text-xs text-slate-400"
                                            >G</span
                                        ></span
                                    >
                                    <UIcon
                                        :name="
                                            expandedScorers.has(
                                                scorer.player_name,
                                            )
                                                ? 'i-lucide-chevron-up'
                                                : 'i-lucide-chevron-down'
                                        "
                                        class="size-4 text-slate-400"
                                    />
                                </div>
                            </button>

                            <!-- Expanded detail rows -->
                            <div
                                v-if="expandedScorers.has(scorer.player_name)"
                                class="bg-slate-50 border-t border-slate-200"
                            >
                                <div
                                    v-for="stat in [
                                        { label: 'Goals', value: scorer.goals },
                                        {
                                            label: 'Assists',
                                            value: scorer.assists,
                                        },
                                        {
                                            label: 'Games Played',
                                            value: scorer.games_played,
                                        },
                                    ]"
                                    :key="stat.label"
                                    class="flex border-b border-slate-200 last:border-b-0"
                                >
                                    <span
                                        class="w-36 shrink-0 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                        >{{ stat.label }}</span
                                    >
                                    <span
                                        class="px-4 py-2 text-sm text-slate-800"
                                        >{{ stat.value }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLeagueStore } from "~/stores/league";
import { useFieldLinks } from "~/composables/useFieldLinks";
import type { Game, Standing, Scorer } from "~/types/league";

const store = useLeagueStore();
const { getFieldUrl } = useFieldLinks();

const selectedTeam = ref<string | null>(null);

const expandedGames = ref<Set<string>>(new Set());
const expandedStandings = ref<Set<string>>(new Set());
const expandedScorers = ref<Set<string>>(new Set());

function gameKey(game: Game): string {
    return `${game.game_date}-${game.home_team}-${game.away_team}`;
}

function toggleGame(game: Game) {
    const key = gameKey(game);
    expandedGames.value = new Set(
        expandedGames.value.has(key)
            ? [...expandedGames.value].filter((k) => k !== key)
            : [...expandedGames.value, key],
    );
}

function toggleStanding(team: Standing) {
    expandedStandings.value = new Set(
        expandedStandings.value.has(team.team_name)
            ? [...expandedStandings.value].filter((k) => k !== team.team_name)
            : [...expandedStandings.value, team.team_name],
    );
}

function toggleScorer(scorer: Scorer) {
    expandedScorers.value = new Set(
        expandedScorers.value.has(scorer.player_name)
            ? [...expandedScorers.value].filter((k) => k !== scorer.player_name)
            : [...expandedScorers.value, scorer.player_name],
    );
}

const teamOptions = computed(() => {
    if (!store.filteredSchedule.length) return [];
    const teams = new Set<string>();
    store.filteredSchedule.forEach((g) => {
        teams.add(g.home_team);
        teams.add(g.away_team);
    });
    return [...teams].sort();
});

const filteredSchedule = computed(() => {
    if (!selectedTeam.value) return store.filteredSchedule;
    return store.filteredSchedule.filter(
        (g) =>
            g.home_team === selectedTeam.value ||
            g.away_team === selectedTeam.value,
    );
});

const scheduleColumns = [
    { accessorKey: "game_date", header: "Date", enableSorting: true },
    { accessorKey: "game_time", header: "Time", enableSorting: true },
    { accessorKey: "field_name", header: "Field", enableSorting: true },
    { accessorKey: "home_team", header: "Home", enableSorting: true },
    { id: "result", header: "Result" },
    { accessorKey: "away_team", header: "Away", enableSorting: true },
];

const standingsColumns = [
    { accessorKey: "standing", header: "#" },
    { accessorKey: "team_name", header: "Team", enableSorting: true },
    { accessorKey: "games_played", header: "GP", enableSorting: true },
    { accessorKey: "wins_total", header: "W", enableSorting: true },
    { accessorKey: "draws_total", header: "D", enableSorting: true },
    { accessorKey: "loses_total", header: "L", enableSorting: true },
    { accessorKey: "goals_for", header: "GF", enableSorting: true },
    { accessorKey: "goals_against", header: "GA", enableSorting: true },
    { accessorKey: "goals_diff", header: "GD", enableSorting: true },
    { accessorKey: "points_total", header: "PTS", enableSorting: true },
];

const scorersColumns = [
    { accessorKey: "standing", header: "#" },
    { accessorKey: "player_name", header: "Player", enableSorting: true },
    { accessorKey: "team_name", header: "Team", enableSorting: true },
    { accessorKey: "goals", header: "Goals", enableSorting: true },
    { accessorKey: "assists", header: "Assists", enableSorting: true },
    { accessorKey: "games_played", header: "GP", enableSorting: true },
];
</script>
