export interface Game {
  game_id: string
  game_date: string
  game_time: string
  schedule_type: string
  home_team_id: string
  home_team: string
  away_team_id: string
  away_team: string
  field_name: string
  game_status: string
  home_team_score: number | null
  away_team_score: number | null
  division_id: string
  division_name: string
}

export interface Standing {
  division_id: string
  division_name: string
  standing: string
  team_name: string
  games_played: string
  wins_total: string
  draws_total: string
  loses_total: string
  points_total: string
  goals_for: string
  goals_against: string
  goals_diff: string
  description: string | null
}

export interface Scorer {
  division_id: string
  standing: string
  player_name: string
  team_name: string
  goals: string
  assists: string
  games_played: string
}
