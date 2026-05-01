<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
            <!-- Division toggle -->
            <div class="flex justify-center">
                <UTabs
                    v-model="store.division"
                    :items="store.divisionOptions"
                    size="lg"
                    :content="false"
                    @update:model-value="selectedTeam = null"
                />
            </div>

            <!-- Season type toggle -->
            <div class="flex justify-center">
                <UTabs
                    v-model="store.seasonType"
                    :items="store.seasonOptions"
                    :content="false"
                    @update:model-value="selectedTeam = null"
                />
            </div>

            <!-- Loading -->
            <div v-if="store.pending" class="flex justify-center py-20">
                <UIcon
                    name="i-lucide-loader-circle"
                    class="size-10 animate-spin text-primary"
                />
            </div>

            <!-- Error -->
            <div v-else-if="store.error" class="text-red-500 text-center py-10">
                Failed to load data. Please try again later.
            </div>

            <template v-else>
                <!-- Schedule -->
                <section>
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-bold">Schedule</h2>
                        <USelectMenu
                            v-model="selectedTeam"
                            :items="teamOptions"
                            placeholder="Filter by team"
                            class="w-64"
                            clear
                        />
                    </div>
                    <UTable
                        :data="filteredSchedule"
                        :columns="scheduleColumns"
                        class="w-full"
                    >
                        <template #field_name-cell="{ row }">
                            <a
                                v-if="getFieldUrl(row.original.field_name)"
                                :href="getFieldUrl(row.original.field_name)!"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-primary font-medium hover:underline"
                            >
                                {{ row.original.field_name }}
                            </a>
                            <span v-else>{{ row.original.field_name }}</span>
                        </template>
                        <template #result-cell="{ row }">
                            <span
                                v-if="
                                    row.original.home_team_score !== null &&
                                    row.original.away_team_score !== null
                                "
                            >
                                {{ row.original.home_team_score }} -
                                {{ row.original.away_team_score }}
                            </span>
                            <span v-else class="text-gray-400">Scheduled</span>
                        </template>
                    </UTable>
                </section>

                <!-- Standings -->
                <section>
                    <h2 class="text-2xl font-bold mb-4">Standings</h2>
                    <UTable
                        :data="store.filteredStandings"
                        :columns="standingsColumns"
                        class="w-full"
                    />
                </section>

                <!-- Top Scorers -->
                <section>
                    <h2 class="text-2xl font-bold mb-4">Top Scorers</h2>
                    <UTable
                        :data="store.filteredScorers"
                        :columns="scorersColumns"
                        class="w-full"
                    />
                </section>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLeagueStore } from "~/stores/league";
import { useFieldLinks } from "~/composables/useFieldLinks";

const store = useLeagueStore();
const { getFieldUrl } = useFieldLinks();

const selectedTeam = ref<string | null>(null);

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
