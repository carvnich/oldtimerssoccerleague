<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-screen-xl mx-auto px-6 py-8 flex flex-col gap-8">
            <!-- Division toggle -->
            <div class="flex justify-center">
                <SelectButton
                    v-model="store.division"
                    :options="store.divisionOptions"
                    optionLabel="label"
                    optionValue="value"
                    size="large"
                    @change="selectedTeam = null"
                />
            </div>

            <!-- Season type toggle -->
            <div class="flex justify-center">
                <SelectButton
                    v-model="store.seasonType"
                    :options="store.seasonOptions"
                    optionLabel="label"
                    optionValue="value"
                    @change="selectedTeam = null"
                />
            </div>

            <!-- Loading -->
            <div v-if="store.pending" class="flex justify-center py-20">
                <ProgressSpinner />
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
                        <Select
                            v-model="selectedTeam"
                            :options="teamOptions"
                            placeholder="Filter by team"
                            showClear
                            class="w-64"
                        />
                    </div>
                    <DataTable
                        :value="filteredSchedule"
                        sortMode="single"
                        removableSort
                        stripedRows
                        showGridlines
                        size="small"
                    >
                        <Column field="game_date" header="Date" sortable />
                        <Column field="game_time" header="Time" sortable />
                        <Column field="field_name" header="Field" sortable>
                            <template #body="{ data }">
                                <a
                                    v-if="getFieldUrl(data.field_name)"
                                    :href="getFieldUrl(data.field_name)!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-orange-600 font-medium hover:text-orange-800"
                                >
                                    {{ data.field_name }}
                                </a>
                                <span v-else>{{ data.field_name }}</span>
                            </template>
                        </Column>
                        <Column field="home_team" header="Home" sortable />
                        <Column header="Result">
                            <template #body="{ data }">
                                <span v-if="data.home_team_score !== null && data.away_team_score !== null">
                                    {{ data.home_team_score }} - {{ data.away_team_score }}
                                </span>
                                <span v-else class="text-gray-400">Scheduled</span>
                            </template>
                        </Column>
                        <Column field="away_team" header="Away" sortable />
                    </DataTable>
                </section>

                <!-- Standings -->
                <section>
                    <h2 class="text-2xl font-bold mb-4">Standings</h2>
                    <DataTable
                        :value="store.filteredStandings"
                        sortMode="single"
                        removableSort
                        stripedRows
                        showGridlines
                        size="small"
                    >
                        <Column field="standing" header="#" style="width: 3rem" />
                        <Column field="team_name" header="Team" sortable />
                        <Column field="games_played" header="GP" sortable />
                        <Column field="wins_total" header="W" sortable />
                        <Column field="draws_total" header="D" sortable />
                        <Column field="loses_total" header="L" sortable />
                        <Column field="goals_for" header="GF" sortable />
                        <Column field="goals_against" header="GA" sortable />
                        <Column field="goals_diff" header="GD" sortable />
                        <Column field="points_total" header="PTS" sortable />
                    </DataTable>
                </section>

                <!-- Top Scorers -->
                <section>
                    <h2 class="text-2xl font-bold mb-4">Top Scorers</h2>
                    <DataTable
                        :value="store.filteredScorers"
                        sortMode="single"
                        removableSort
                        stripedRows
                        showGridlines
                        size="small"
                    >
                        <Column field="standing" header="#" style="width: 3rem" />
                        <Column field="player_name" header="Player" sortable />
                        <Column field="team_name" header="Team" sortable />
                        <Column field="goals" header="Goals" sortable />
                        <Column field="assists" header="Assists" sortable />
                        <Column field="games_played" header="GP" sortable />
                    </DataTable>
                </section>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLeagueStore } from '~/stores/league'
import { useFieldLinks } from '~/composables/useFieldLinks'

const store = useLeagueStore()
const { getFieldUrl } = useFieldLinks()

const selectedTeam = ref<string | null>(null)

const teamOptions = computed(() => {
    if (!store.filteredSchedule.length) return []
    const teams = new Set<string>()
    store.filteredSchedule.forEach((g) => {
        teams.add(g.home_team)
        teams.add(g.away_team)
    })
    return [...teams].sort()
})

const filteredSchedule = computed(() => {
    if (!selectedTeam.value) return store.filteredSchedule
    return store.filteredSchedule.filter(
        (g) => g.home_team === selectedTeam.value || g.away_team === selectedTeam.value
    )
})
</script>
