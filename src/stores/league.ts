import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCookie } from "@/composables/useCookie";
import type { Game, Standing, Scorer } from "@/types/league";

const SEASON_YEAR = "2026";
const API_BASE = "/api/otsl_api.php";

const CUP_DIVISION_MAP: Record<string, string> = {
  A: "SP. CUP A",
  B: "SP. CUP A",
  C: "SP. CUP B",
  D: "SP. CUP B",
  E: "SP. CUP B",
};

async function apiFetch<T>(action: string): Promise<T> {
  const res = await fetch(`${API_BASE}?otsl_action=${action}&season_year=${SEASON_YEAR}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export const useLeagueStore = defineStore("league", () => {
  const division = useCookie("otsl-division", "A");
  const seasonType = useCookie("otsl-season-type", "regular");
  const selectedTeam = useCookie("otsl-selected-team", "");

  const divisionOptions = [
    { label: "Division A", value: "A" },
    { label: "Division B", value: "B" },
    { label: "Division C", value: "C" },
    { label: "Division D", value: "D" },
    { label: "Division E", value: "E" },
  ];

  const seasonOptions = [
    { label: "All", value: "all" },
    { label: "Regular Season", value: "regular" },
    { label: "Cup", value: "cup" },
    { label: "Playoff", value: "playoff" },
  ];

  const scheduleData = ref<Game[]>([]);
  const standingsData = ref<Standing[]>([]);
  const scorersData = ref<Scorer[]>([]);
  const pending = ref(true);
  const error = ref<string | null>(null);

  async function load() {
    pending.value = true;
    error.value = null;
    try {
      const [schedule, standings, scorers] = await Promise.all([
        apiFetch<Game[]>("get_league_schedule"),
        apiFetch<Standing[]>("show_standings"),
        apiFetch<Scorer[]>("get_scorers"),
      ]);
      scheduleData.value = schedule;
      standingsData.value = standings;
      scorersData.value = scorers;
    } catch {
      error.value = "Failed to load data. Please try again later.";
    } finally {
      pending.value = false;
    }
  }

  const scheduleDivisionId = computed(() => {
    if (seasonType.value === "cup") return CUP_DIVISION_MAP[division.value];
    return `${division.value} DIVISION`;
  });

  const scheduleType = computed(() => {
    if (seasonType.value === "cup") return "Spence Cup";
    if (seasonType.value === "playoff") return "Playoff";
    return "Regular";
  });

  const filteredSchedule = computed(() => {
    if (seasonType.value === "all") {
      const divId = `${division.value} DIVISION`;
      const cupId = CUP_DIVISION_MAP[division.value];
      return scheduleData.value.filter(
        (g) =>
          (g.division_id === divId &&
            (g.schedule_type === "Regular" || g.schedule_type === "Playoff")) ||
          (g.division_id === cupId && g.schedule_type === "Spence Cup"),
      );
    }
    return scheduleData.value.filter(
      (g) =>
        g.division_id === scheduleDivisionId.value && g.schedule_type === scheduleType.value,
    );
  });

  const filteredStandings = computed(() =>
    standingsData.value.filter((s) => s.division_id === `${division.value} DIVISION`),
  );

  const filteredScorers = computed(() => {
    if (seasonType.value === "cup") {
      return scorersData.value.filter((s) => s.division_id === CUP_DIVISION_MAP[division.value]);
    }
    if (seasonType.value === "all") {
      const divId = `${division.value} DIVISION`;
      const cupId = CUP_DIVISION_MAP[division.value];
      return scorersData.value.filter(
        (s) =>
          (s.division_id === divId && s.schedule_type === "Regular") ||
          (s.division_id === cupId && s.schedule_type === "Spence Cup"),
      );
    }
    return scorersData.value.filter((s) => s.division_id === `${division.value} DIVISION`);
  });

  return {
    division,
    seasonType,
    selectedTeam,
    divisionOptions,
    seasonOptions,
    pending,
    error,
    load,
    filteredSchedule,
    filteredStandings,
    filteredScorers,
  };
});
