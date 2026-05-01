<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Nav bar -->
    <nav class="bg-[#a2e436] px-6 py-5 shadow-sm">
      <h1 class="text-2xl font-bold text-black text-center">Old Timers Soccer League</h1>
    </nav>

    <div class="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">

      <!-- Division toggle -->
      <div class="flex justify-center">
        <SelectButton v-model="division" :options="divisionOptions" optionLabel="label" optionValue="value" />
      </div>

      <!-- Season type toggle -->
      <div class="flex justify-center">
        <SelectButton v-model="seasonType" :options="seasonOptions" optionLabel="label" optionValue="value" />
      </div>

      <!-- Schedule -->
      <section>
        <h2 class="text-2xl font-bold text-black mb-4">Schedule</h2>
        <DataTable :value="currentData.schedule" sortMode="single" removableSort stripedRows class="rounded shadow-sm">
          <Column field="date" header="Date" sortable />
          <Column field="home" header="Home" sortable />
          <Column field="away" header="Away" sortable />
          <Column field="time" header="Time" sortable />
          <Column field="field" header="Field" sortable />
          <Column field="result" header="Result" sortable />
        </DataTable>
      </section>

      <!-- Standings -->
      <section>
        <h2 class="text-2xl font-bold text-black mb-4">Standings</h2>
        <DataTable :value="currentData.standings" sortMode="single" removableSort stripedRows class="rounded shadow-sm">
          <Column field="rank" header="#" style="width:3rem" />
          <Column field="name" header="Team" sortable />
          <Column field="gp" header="GP" sortable />
          <Column field="w" header="W" sortable />
          <Column field="d" header="D" sortable />
          <Column field="l" header="L" sortable />
          <Column field="gf" header="GF" sortable />
          <Column field="ga" header="GA" sortable />
          <Column field="gd" header="GD" sortable />
          <Column field="pts" header="PTS" sortable />
        </DataTable>
      </section>

      <!-- Top Scorers -->
      <section>
        <h2 class="text-2xl font-bold text-black mb-4">Top Scorers</h2>
        <DataTable :value="currentData.scorers" sortMode="single" removableSort stripedRows class="rounded shadow-sm">
          <Column field="rank" header="#" style="width:3rem" />
          <Column field="name" header="Player" sortable />
          <Column field="team" header="Team" sortable />
          <Column field="goals" header="Goals" sortable />
          <Column field="assists" header="Assists" sortable />
          <Column field="gp" header="GP" sortable />
        </DataTable>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
const division = ref('a')
const divisionOptions = [
  { label: 'Division A', value: 'a' },
  { label: 'Division B', value: 'b' },
  { label: 'Division C', value: 'c' },
  { label: 'Division D', value: 'd' },
  { label: 'Division E', value: 'e' },
]

const seasonType = ref('regular')
const seasonOptions = [
  { label: 'Regular Season', value: 'regular' },
  { label: 'Cup', value: 'cup' },
  { label: 'Playoff', value: 'playoff' },
]

type SeasonData = {
  schedule: { date: string; home: string; away: string; time: string; field: string; result: string }[]
  standings: { rank: number; name: string; gp: number; w: number; d: number; l: number; gf: number; ga: number; gd: number; pts: number }[]
  scorers: { rank: number; name: string; team: string; goals: number; assists: number; gp: number }[]
}

type DivisionData = Record<'regular' | 'cup' | 'playoff', SeasonData>

const data: Record<string, DivisionData> = {
  a: {
    regular: {
      schedule: [
        { date: 'May 5', home: 'Placeholder FC', away: 'Demo United', time: '10:00 AM', field: 'Field 1', result: '2-1' },
        { date: 'May 5', home: 'Sample SC', away: 'Test City', time: '11:30 AM', field: 'Field 2', result: '0-0' },
        { date: 'May 12', home: 'Mock Athletic', away: 'Placeholder FC', time: '9:00 AM', field: 'Field 1', result: 'TBD' },
        { date: 'May 12', home: 'Demo United', away: 'Sample SC', time: '10:30 AM', field: 'Field 3', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Placeholder FC', gp: 10, w: 8, d: 1, l: 1, gf: 24, ga: 8, gd: 16, pts: 25 },
        { rank: 2, name: 'Demo United', gp: 10, w: 6, d: 2, l: 2, gf: 18, ga: 11, gd: 7, pts: 20 },
        { rank: 3, name: 'Sample SC', gp: 10, w: 5, d: 3, l: 2, gf: 15, ga: 10, gd: 5, pts: 18 },
        { rank: 4, name: 'Test City', gp: 10, w: 4, d: 1, l: 5, gf: 13, ga: 17, gd: -4, pts: 13 },
        { rank: 5, name: 'Mock Athletic', gp: 10, w: 1, d: 0, l: 9, gf: 5, ga: 29, gd: -24, pts: 3 },
      ],
      scorers: [
        { rank: 1, name: 'John Doe', team: 'Placeholder FC', goals: 12, assists: 4, gp: 10 },
        { rank: 2, name: 'Mike Smith', team: 'Demo United', goals: 9, assists: 6, gp: 10 },
        { rank: 3, name: 'Carlos Rivera', team: 'Sample SC', goals: 7, assists: 3, gp: 9 },
        { rank: 4, name: 'James Park', team: 'Test City', goals: 5, assists: 5, gp: 10 },
        { rank: 5, name: 'Tom Wilson', team: 'Placeholder FC', goals: 4, assists: 7, gp: 8 },
      ],
    },
    cup: {
      schedule: [
        { date: 'Jun 1', home: 'Placeholder FC', away: 'Sample SC', time: '10:00 AM', field: 'Field 1', result: '3-0' },
        { date: 'Jun 1', home: 'Demo United', away: 'Mock Athletic', time: '11:30 AM', field: 'Field 2', result: '1-1' },
        { date: 'Jun 8', home: 'Test City', away: 'Placeholder FC', time: '9:00 AM', field: 'Field 1', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Placeholder FC', gp: 4, w: 3, d: 1, l: 0, gf: 10, ga: 2, gd: 8, pts: 10 },
        { rank: 2, name: 'Demo United', gp: 4, w: 2, d: 2, l: 0, gf: 7, ga: 4, gd: 3, pts: 8 },
        { rank: 3, name: 'Test City', gp: 4, w: 2, d: 0, l: 2, gf: 6, ga: 6, gd: 0, pts: 6 },
        { rank: 4, name: 'Sample SC', gp: 4, w: 1, d: 1, l: 2, gf: 4, ga: 8, gd: -4, pts: 4 },
        { rank: 5, name: 'Mock Athletic', gp: 4, w: 0, d: 0, l: 4, gf: 1, ga: 8, gd: -7, pts: 0 },
      ],
      scorers: [
        { rank: 1, name: 'Carlos Rivera', team: 'Sample SC', goals: 5, assists: 2, gp: 4 },
        { rank: 2, name: 'John Doe', team: 'Placeholder FC', goals: 4, assists: 3, gp: 4 },
        { rank: 3, name: 'James Park', team: 'Test City', goals: 3, assists: 1, gp: 4 },
        { rank: 4, name: 'Mike Smith', team: 'Demo United', goals: 2, assists: 4, gp: 4 },
        { rank: 5, name: 'Tom Wilson', team: 'Placeholder FC', goals: 2, assists: 2, gp: 3 },
      ],
    },
    playoff: {
      schedule: [
        { date: 'Jul 6', home: 'Placeholder FC', away: 'Test City', time: '10:00 AM', field: 'Field 1', result: '2-0' },
        { date: 'Jul 6', home: 'Demo United', away: 'Sample SC', time: '12:00 PM', field: 'Field 2', result: '1-2' },
        { date: 'Jul 13', home: 'Placeholder FC', away: 'Sample SC', time: '11:00 AM', field: 'Field 1', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Placeholder FC', gp: 2, w: 2, d: 0, l: 0, gf: 5, ga: 1, gd: 4, pts: 6 },
        { rank: 2, name: 'Sample SC', gp: 2, w: 1, d: 0, l: 1, gf: 3, ga: 3, gd: 0, pts: 3 },
        { rank: 3, name: 'Demo United', gp: 2, w: 1, d: 0, l: 1, gf: 2, ga: 3, gd: -1, pts: 3 },
        { rank: 4, name: 'Test City', gp: 2, w: 0, d: 0, l: 2, gf: 1, ga: 4, gd: -3, pts: 0 },
      ],
      scorers: [
        { rank: 1, name: 'John Doe', team: 'Placeholder FC', goals: 3, assists: 1, gp: 2 },
        { rank: 2, name: 'Carlos Rivera', team: 'Sample SC', goals: 2, assists: 0, gp: 2 },
        { rank: 3, name: 'Mike Smith', team: 'Demo United', goals: 1, assists: 2, gp: 2 },
        { rank: 4, name: 'Tom Wilson', team: 'Placeholder FC', goals: 1, assists: 1, gp: 2 },
      ],
    },
  },
  b: {
    regular: {
      schedule: [
        { date: 'May 6', home: 'Blue Ravens', away: 'Iron City', time: '9:00 AM', field: 'Field 4', result: '1-1' },
        { date: 'May 6', home: 'Valley FC', away: 'North Stars', time: '10:30 AM', field: 'Field 5', result: '3-2' },
        { date: 'May 13', home: 'Iron City', away: 'Valley FC', time: '11:00 AM', field: 'Field 4', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Valley FC', gp: 10, w: 7, d: 2, l: 1, gf: 21, ga: 9, gd: 12, pts: 23 },
        { rank: 2, name: 'Blue Ravens', gp: 10, w: 6, d: 1, l: 3, gf: 17, ga: 13, gd: 4, pts: 19 },
        { rank: 3, name: 'Iron City', gp: 10, w: 4, d: 3, l: 3, gf: 14, ga: 14, gd: 0, pts: 15 },
        { rank: 4, name: 'North Stars', gp: 10, w: 2, d: 2, l: 6, gf: 10, ga: 20, gd: -10, pts: 8 },
        { rank: 5, name: 'Westside SC', gp: 10, w: 1, d: 0, l: 9, gf: 4, ga: 22, gd: -18, pts: 3 },
      ],
      scorers: [
        { rank: 1, name: 'Luis Gomez', team: 'Valley FC', goals: 10, assists: 5, gp: 10 },
        { rank: 2, name: 'Andre White', team: 'Blue Ravens', goals: 8, assists: 3, gp: 10 },
        { rank: 3, name: 'Sam Lee', team: 'Iron City', goals: 6, assists: 4, gp: 9 },
        { rank: 4, name: 'Dan King', team: 'North Stars', goals: 4, assists: 2, gp: 10 },
        { rank: 5, name: 'Rob Chen', team: 'Valley FC', goals: 3, assists: 6, gp: 8 },
      ],
    },
    cup: {
      schedule: [
        { date: 'Jun 2', home: 'Valley FC', away: 'Iron City', time: '10:00 AM', field: 'Field 4', result: '2-1' },
        { date: 'Jun 9', home: 'Blue Ravens', away: 'North Stars', time: '11:00 AM', field: 'Field 5', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Valley FC', gp: 3, w: 2, d: 1, l: 0, gf: 7, ga: 3, gd: 4, pts: 7 },
        { rank: 2, name: 'Blue Ravens', gp: 3, w: 2, d: 0, l: 1, gf: 5, ga: 4, gd: 1, pts: 6 },
        { rank: 3, name: 'Iron City', gp: 3, w: 1, d: 1, l: 1, gf: 4, ga: 5, gd: -1, pts: 4 },
        { rank: 4, name: 'North Stars', gp: 3, w: 0, d: 0, l: 3, gf: 2, ga: 6, gd: -4, pts: 0 },
      ],
      scorers: [
        { rank: 1, name: 'Luis Gomez', team: 'Valley FC', goals: 4, assists: 1, gp: 3 },
        { rank: 2, name: 'Andre White', team: 'Blue Ravens', goals: 3, assists: 2, gp: 3 },
        { rank: 3, name: 'Sam Lee', team: 'Iron City', goals: 2, assists: 1, gp: 3 },
        { rank: 4, name: 'Dan King', team: 'North Stars', goals: 1, assists: 0, gp: 3 },
      ],
    },
    playoff: {
      schedule: [
        { date: 'Jul 7', home: 'Valley FC', away: 'Blue Ravens', time: '10:00 AM', field: 'Field 4', result: '1-0' },
        { date: 'Jul 14', home: 'Valley FC', away: 'Iron City', time: '11:00 AM', field: 'Field 4', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Valley FC', gp: 2, w: 2, d: 0, l: 0, gf: 4, ga: 1, gd: 3, pts: 6 },
        { rank: 2, name: 'Iron City', gp: 2, w: 1, d: 0, l: 1, gf: 3, ga: 3, gd: 0, pts: 3 },
        { rank: 3, name: 'Blue Ravens', gp: 2, w: 0, d: 0, l: 2, gf: 1, ga: 4, gd: -3, pts: 0 },
      ],
      scorers: [
        { rank: 1, name: 'Luis Gomez', team: 'Valley FC', goals: 3, assists: 0, gp: 2 },
        { rank: 2, name: 'Sam Lee', team: 'Iron City', goals: 2, assists: 1, gp: 2 },
        { rank: 3, name: 'Andre White', team: 'Blue Ravens', goals: 1, assists: 0, gp: 2 },
      ],
    },
  },
  c: {
    regular: {
      schedule: [
        { date: 'May 7', home: 'Eastside FC', away: 'Riverside SC', time: '9:00 AM', field: 'Field 6', result: '2-2' },
        { date: 'May 7', home: 'Hillside Utd', away: 'Harbor FC', time: '10:30 AM', field: 'Field 7', result: '1-0' },
        { date: 'May 14', home: 'Riverside SC', away: 'Hillside Utd', time: '9:00 AM', field: 'Field 6', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Hillside Utd', gp: 10, w: 7, d: 1, l: 2, gf: 20, ga: 10, gd: 10, pts: 22 },
        { rank: 2, name: 'Eastside FC', gp: 10, w: 6, d: 2, l: 2, gf: 18, ga: 12, gd: 6, pts: 20 },
        { rank: 3, name: 'Riverside SC', gp: 10, w: 4, d: 2, l: 4, gf: 13, ga: 15, gd: -2, pts: 14 },
        { rank: 4, name: 'Harbor FC', gp: 10, w: 3, d: 1, l: 6, gf: 10, ga: 18, gd: -8, pts: 10 },
        { rank: 5, name: 'Lakewood SC', gp: 10, w: 1, d: 2, l: 7, gf: 7, ga: 23, gd: -16, pts: 5 },
      ],
      scorers: [
        { rank: 1, name: 'Peter Hall', team: 'Hillside Utd', goals: 11, assists: 3, gp: 10 },
        { rank: 2, name: 'Tony Bass', team: 'Eastside FC', goals: 8, assists: 5, gp: 10 },
        { rank: 3, name: 'Marco Diaz', team: 'Riverside SC', goals: 6, assists: 2, gp: 9 },
        { rank: 4, name: 'Chris Ford', team: 'Harbor FC', goals: 4, assists: 3, gp: 10 },
        { rank: 5, name: 'Jake Moore', team: 'Hillside Utd', goals: 3, assists: 5, gp: 8 },
      ],
    },
    cup: {
      schedule: [
        { date: 'Jun 3', home: 'Hillside Utd', away: 'Eastside FC', time: '10:00 AM', field: 'Field 6', result: '2-0' },
        { date: 'Jun 10', home: 'Riverside SC', away: 'Harbor FC', time: '11:00 AM', field: 'Field 7', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Hillside Utd', gp: 3, w: 3, d: 0, l: 0, gf: 8, ga: 2, gd: 6, pts: 9 },
        { rank: 2, name: 'Riverside SC', gp: 3, w: 1, d: 1, l: 1, gf: 4, ga: 5, gd: -1, pts: 4 },
        { rank: 3, name: 'Eastside FC', gp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, gd: -2, pts: 3 },
        { rank: 4, name: 'Harbor FC', gp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 5, gd: -3, pts: 1 },
      ],
      scorers: [
        { rank: 1, name: 'Peter Hall', team: 'Hillside Utd', goals: 5, assists: 1, gp: 3 },
        { rank: 2, name: 'Marco Diaz', team: 'Riverside SC', goals: 3, assists: 0, gp: 3 },
        { rank: 3, name: 'Tony Bass', team: 'Eastside FC', goals: 2, assists: 2, gp: 3 },
        { rank: 4, name: 'Chris Ford', team: 'Harbor FC', goals: 1, assists: 1, gp: 3 },
      ],
    },
    playoff: {
      schedule: [
        { date: 'Jul 8', home: 'Hillside Utd', away: 'Riverside SC', time: '10:00 AM', field: 'Field 6', result: '3-1' },
        { date: 'Jul 15', home: 'Hillside Utd', away: 'Eastside FC', time: '11:00 AM', field: 'Field 6', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Hillside Utd', gp: 2, w: 2, d: 0, l: 0, gf: 5, ga: 2, gd: 3, pts: 6 },
        { rank: 2, name: 'Eastside FC', gp: 2, w: 1, d: 0, l: 1, gf: 3, ga: 3, gd: 0, pts: 3 },
        { rank: 3, name: 'Riverside SC', gp: 2, w: 0, d: 0, l: 2, gf: 2, ga: 5, gd: -3, pts: 0 },
      ],
      scorers: [
        { rank: 1, name: 'Peter Hall', team: 'Hillside Utd', goals: 3, assists: 1, gp: 2 },
        { rank: 2, name: 'Tony Bass', team: 'Eastside FC', goals: 2, assists: 0, gp: 2 },
        { rank: 3, name: 'Marco Diaz', team: 'Riverside SC', goals: 1, assists: 0, gp: 2 },
      ],
    },
  },
  d: {
    regular: {
      schedule: [
        { date: 'May 8', home: 'Summit FC', away: 'Crestview SC', time: '9:00 AM', field: 'Field 8', result: '0-1' },
        { date: 'May 8', home: 'Bayview Utd', away: 'Pinewood FC', time: '10:30 AM', field: 'Field 9', result: '2-0' },
        { date: 'May 15', home: 'Crestview SC', away: 'Bayview Utd', time: '9:00 AM', field: 'Field 8', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Crestview SC', gp: 10, w: 8, d: 0, l: 2, gf: 22, ga: 9, gd: 13, pts: 24 },
        { rank: 2, name: 'Bayview Utd', gp: 10, w: 6, d: 1, l: 3, gf: 16, ga: 11, gd: 5, pts: 19 },
        { rank: 3, name: 'Summit FC', gp: 10, w: 4, d: 2, l: 4, gf: 13, ga: 14, gd: -1, pts: 14 },
        { rank: 4, name: 'Pinewood FC', gp: 10, w: 2, d: 3, l: 5, gf: 9, ga: 16, gd: -7, pts: 9 },
        { rank: 5, name: 'Meadow SC', gp: 10, w: 1, d: 0, l: 9, gf: 5, ga: 25, gd: -20, pts: 3 },
      ],
      scorers: [
        { rank: 1, name: 'Ryan Torres', team: 'Crestview SC', goals: 13, assists: 2, gp: 10 },
        { rank: 2, name: 'Kevin Marsh', team: 'Bayview Utd', goals: 7, assists: 5, gp: 10 },
        { rank: 3, name: 'Eric Stone', team: 'Summit FC', goals: 5, assists: 3, gp: 9 },
        { rank: 4, name: 'Phil Grant', team: 'Pinewood FC', goals: 4, assists: 2, gp: 10 },
        { rank: 5, name: 'Owen Nash', team: 'Crestview SC', goals: 3, assists: 4, gp: 8 },
      ],
    },
    cup: {
      schedule: [
        { date: 'Jun 4', home: 'Crestview SC', away: 'Bayview Utd', time: '10:00 AM', field: 'Field 8', result: '1-0' },
        { date: 'Jun 11', home: 'Summit FC', away: 'Pinewood FC', time: '11:00 AM', field: 'Field 9', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Crestview SC', gp: 3, w: 3, d: 0, l: 0, gf: 7, ga: 1, gd: 6, pts: 9 },
        { rank: 2, name: 'Summit FC', gp: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, gd: 0, pts: 4 },
        { rank: 3, name: 'Bayview Utd', gp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, gd: -2, pts: 3 },
        { rank: 4, name: 'Pinewood FC', gp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 6, gd: -4, pts: 1 },
      ],
      scorers: [
        { rank: 1, name: 'Ryan Torres', team: 'Crestview SC', goals: 4, assists: 2, gp: 3 },
        { rank: 2, name: 'Kevin Marsh', team: 'Bayview Utd', goals: 2, assists: 1, gp: 3 },
        { rank: 3, name: 'Eric Stone', team: 'Summit FC', goals: 2, assists: 0, gp: 3 },
        { rank: 4, name: 'Phil Grant', team: 'Pinewood FC', goals: 1, assists: 1, gp: 3 },
      ],
    },
    playoff: {
      schedule: [
        { date: 'Jul 9', home: 'Crestview SC', away: 'Summit FC', time: '10:00 AM', field: 'Field 8', result: '2-1' },
        { date: 'Jul 16', home: 'Crestview SC', away: 'Bayview Utd', time: '11:00 AM', field: 'Field 8', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Crestview SC', gp: 2, w: 2, d: 0, l: 0, gf: 5, ga: 1, gd: 4, pts: 6 },
        { rank: 2, name: 'Bayview Utd', gp: 2, w: 1, d: 0, l: 1, gf: 3, ga: 3, gd: 0, pts: 3 },
        { rank: 3, name: 'Summit FC', gp: 2, w: 0, d: 0, l: 2, gf: 1, ga: 5, gd: -4, pts: 0 },
      ],
      scorers: [
        { rank: 1, name: 'Ryan Torres', team: 'Crestview SC', goals: 3, assists: 0, gp: 2 },
        { rank: 2, name: 'Kevin Marsh', team: 'Bayview Utd', goals: 2, assists: 1, gp: 2 },
        { rank: 3, name: 'Eric Stone', team: 'Summit FC', goals: 1, assists: 0, gp: 2 },
      ],
    },
  },
  e: {
    regular: {
      schedule: [
        { date: 'May 9', home: 'Redwood FC', away: 'Sunrise SC', time: '9:00 AM', field: 'Field 10', result: '1-0' },
        { date: 'May 9', home: 'Coastal Utd', away: 'Falcon FC', time: '10:30 AM', field: 'Field 11', result: '2-3' },
        { date: 'May 16', home: 'Sunrise SC', away: 'Coastal Utd', time: '9:00 AM', field: 'Field 10', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Falcon FC', gp: 10, w: 8, d: 1, l: 1, gf: 25, ga: 7, gd: 18, pts: 25 },
        { rank: 2, name: 'Redwood FC', gp: 10, w: 6, d: 2, l: 2, gf: 19, ga: 10, gd: 9, pts: 20 },
        { rank: 3, name: 'Coastal Utd', gp: 10, w: 5, d: 1, l: 4, gf: 14, ga: 13, gd: 1, pts: 16 },
        { rank: 4, name: 'Sunrise SC', gp: 10, w: 2, d: 2, l: 6, gf: 9, ga: 20, gd: -11, pts: 8 },
        { rank: 5, name: 'Pinehill FC', gp: 10, w: 0, d: 2, l: 8, gf: 5, ga: 28, gd: -23, pts: 2 },
      ],
      scorers: [
        { rank: 1, name: 'Victor Cruz', team: 'Falcon FC', goals: 14, assists: 3, gp: 10 },
        { rank: 2, name: 'Nathan Bell', team: 'Redwood FC', goals: 9, assists: 4, gp: 10 },
        { rank: 3, name: 'Omar Hassan', team: 'Coastal Utd', goals: 6, assists: 5, gp: 9 },
        { rank: 4, name: 'Ben Holt', team: 'Sunrise SC', goals: 4, assists: 2, gp: 10 },
        { rank: 5, name: 'Ivan Petrov', team: 'Falcon FC', goals: 3, assists: 6, gp: 8 },
      ],
    },
    cup: {
      schedule: [
        { date: 'Jun 5', home: 'Falcon FC', away: 'Redwood FC', time: '10:00 AM', field: 'Field 10', result: '2-1' },
        { date: 'Jun 12', home: 'Coastal Utd', away: 'Sunrise SC', time: '11:00 AM', field: 'Field 11', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Falcon FC', gp: 3, w: 3, d: 0, l: 0, gf: 9, ga: 2, gd: 7, pts: 9 },
        { rank: 2, name: 'Coastal Utd', gp: 3, w: 1, d: 1, l: 1, gf: 4, ga: 5, gd: -1, pts: 4 },
        { rank: 3, name: 'Redwood FC', gp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, gd: -2, pts: 3 },
        { rank: 4, name: 'Sunrise SC', gp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 6, gd: -4, pts: 1 },
      ],
      scorers: [
        { rank: 1, name: 'Victor Cruz', team: 'Falcon FC', goals: 5, assists: 2, gp: 3 },
        { rank: 2, name: 'Omar Hassan', team: 'Coastal Utd', goals: 3, assists: 1, gp: 3 },
        { rank: 3, name: 'Nathan Bell', team: 'Redwood FC', goals: 2, assists: 0, gp: 3 },
        { rank: 4, name: 'Ben Holt', team: 'Sunrise SC', goals: 1, assists: 1, gp: 3 },
      ],
    },
    playoff: {
      schedule: [
        { date: 'Jul 10', home: 'Falcon FC', away: 'Coastal Utd', time: '10:00 AM', field: 'Field 10', result: '3-0' },
        { date: 'Jul 17', home: 'Falcon FC', away: 'Redwood FC', time: '11:00 AM', field: 'Field 10', result: 'TBD' },
      ],
      standings: [
        { rank: 1, name: 'Falcon FC', gp: 2, w: 2, d: 0, l: 0, gf: 6, ga: 0, gd: 6, pts: 6 },
        { rank: 2, name: 'Redwood FC', gp: 2, w: 1, d: 0, l: 1, gf: 3, ga: 3, gd: 0, pts: 3 },
        { rank: 3, name: 'Coastal Utd', gp: 2, w: 0, d: 0, l: 2, gf: 0, ga: 6, gd: -6, pts: 0 },
      ],
      scorers: [
        { rank: 1, name: 'Victor Cruz', team: 'Falcon FC', goals: 4, assists: 1, gp: 2 },
        { rank: 2, name: 'Nathan Bell', team: 'Redwood FC', goals: 2, assists: 0, gp: 2 },
        { rank: 3, name: 'Ivan Petrov', team: 'Falcon FC', goals: 1, assists: 2, gp: 2 },
      ],
    },
  },
}

const currentData = computed(() => data[division.value][seasonType.value as 'regular' | 'cup' | 'playoff'])
</script>
