import { defineStore } from "pinia";
import type { Game, Standing, Scorer } from "~/types/league";

const SEASON_YEAR = "2026";
const API_BASE = "http://oldtimerssoccerleague.com/otsl_api.php";

// Divisions A+B share SP. CUP A, C+D+E share SP. CUP B
const CUP_DIVISION_MAP: Record<string, string> = {
  A: "SP. CUP A",
  B: "SP. CUP A",
  C: "SP. CUP B",
  D: "SP. CUP B",
  E: "SP. CUP B",
};

export const useLeagueStore = defineStore("league", () => {
  const division = useCookie("otsl-division", { default: () => "A", maxAge: 60 * 60 * 24 * 365 });
  const seasonType = useCookie("otsl-season-type", { default: () => "regular", maxAge: 60 * 60 * 24 * 365 });

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

  const { data: scheduleData, pending: schedulePending, error: scheduleError } = useFetch<Game[]>(`${API_BASE}?otsl_action=get_league_schedule&season_year=${SEASON_YEAR}`);

  const { data: standingsData, pending: standingsPending, error: standingsError } = useFetch<Standing[]>(`${API_BASE}?otsl_action=show_standings&season_year=${SEASON_YEAR}`);

  const { data: scorersData, pending: scorersPending, error: scorersError } = useFetch<Scorer[]>(`${API_BASE}?otsl_action=get_scorers&season_year=${SEASON_YEAR}`);

  const pending = computed(() => schedulePending.value || standingsPending.value || scorersPending.value);
  const error = computed(() => scheduleError.value || standingsError.value || scorersError.value);

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
    if (!scheduleData.value) return [];
    if (seasonType.value === "all") {
      const divisionDivId = `${division.value} DIVISION`;
      const cupDivId = CUP_DIVISION_MAP[division.value];
      return scheduleData.value.filter((g) => (g.division_id === divisionDivId && (g.schedule_type === "Regular" || g.schedule_type === "Playoff")) || (g.division_id === cupDivId && g.schedule_type === "Spence Cup"));
    }
    return scheduleData.value.filter((g) => g.division_id === scheduleDivisionId.value && g.schedule_type === scheduleType.value);
  });

  const filteredStandings = computed(() => {
    if (!standingsData.value) return [];
    return standingsData.value.filter((s) => s.division_id === `${division.value} DIVISION`);
  });

  const filteredScorers = computed(() => {
    if (!scorersData.value) return [];
    return scorersData.value.filter((s) => s.division_id === `${division.value} DIVISION`);
  });

  return {
    division,
    seasonType,
    divisionOptions,
    seasonOptions,
    pending,
    error,
    filteredSchedule,
    filteredStandings,
    filteredScorers,
  };
});
