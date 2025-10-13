// Database schema definitions for IMPWR
// This file defines the structure of all tables in the SQLite database

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface DataSource {
  id: string
  user_id: string
  source_type: "mobile" | "desktop" | "web" | "cloud"
  source_name: string
  is_connected: boolean
  last_sync: string | null
  permissions: string // JSON string
}

export interface RawDataEntry {
  id: string
  user_id: string
  source_id: string
  data_type: string
  data_value: string // JSON string
  timestamp: string
}

// Pillar-specific tables

export interface EnergyLog {
  log_id: string
  user_id: string
  energy_level: number // 1-10
  timestamp: string
  correlated_metrics: string | null // JSON string
  notes: string | null
}

export interface FinancialTransaction {
  transaction_id: string
  user_id: string
  amount: number
  category: string
  merchant: string | null
  date: string
  is_recurring: boolean
  notes: string | null
}

export interface EmotionEntry {
  entry_id: string
  user_id: string
  emotion_tags: string // JSON array
  intensity: number // 1-10
  journal_text: string | null
  timestamp: string
}

export interface PhysicalHealthMetric {
  metric_id: string
  user_id: string
  metric_type: "steps" | "hrv" | "weight" | "sleep" | "exercise"
  value: number
  unit: string
  timestamp: string
  source: string | null
}

export interface MentalHealthActivity {
  activity_id: string
  user_id: string
  activity_type: "meditation" | "learning" | "focus_time" | "reading"
  duration: number // minutes
  timestamp: string
  notes: string | null
}

export interface SpiritualHealthPractice {
  practice_id: string
  user_id: string
  practice_type: "gratitude_journal" | "meditation" | "community_service" | "reflection"
  notes: string | null
  timestamp: string
}

export interface ProcessedInsight {
  insight_id: string
  user_id: string
  linked_entry_ids: string // JSON array
  insight_type: "correlation" | "trend" | "anomaly" | "recommendation"
  insight_value: string
  confidence_score: number // 0-100
  linked_pillars: string // JSON array of pillar names
  timestamp: string
  is_dismissed: boolean
}

export interface Goal {
  goal_id: string
  user_id: string
  pillar: "energy" | "financial" | "emotions" | "physical" | "mental" | "spiritual"
  title: string
  description: string | null
  target_value: number | null
  current_value: number | null
  deadline: string | null
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface MindMap {
  map_id: string
  user_id: string
  map_data: string // JSON string containing nodes and links
  created_at: string
  updated_at: string
}

// SQL Schema Creation Statements
export const CREATE_TABLES_SQL = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Data Sources table
CREATE TABLE IF NOT EXISTS data_sources (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_name TEXT NOT NULL,
  is_connected INTEGER NOT NULL DEFAULT 0,
  last_sync TEXT,
  permissions TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Raw Data Entries table
CREATE TABLE IF NOT EXISTS raw_data_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  data_type TEXT NOT NULL,
  data_value TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (source_id) REFERENCES data_sources(id)
);

-- Energy Logs table
CREATE TABLE IF NOT EXISTS energy_logs (
  log_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  energy_level INTEGER NOT NULL CHECK(energy_level >= 1 AND energy_level <= 10),
  timestamp TEXT NOT NULL,
  correlated_metrics TEXT,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Financial Transactions table
CREATE TABLE IF NOT EXISTS financial_transactions (
  transaction_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount REAL NOT NULL,
  category TEXT NOT NULL,
  merchant TEXT,
  date TEXT NOT NULL,
  is_recurring INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Emotion Entries table
CREATE TABLE IF NOT EXISTS emotion_entries (
  entry_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  emotion_tags TEXT NOT NULL,
  intensity INTEGER NOT NULL CHECK(intensity >= 1 AND intensity <= 10),
  journal_text TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Physical Health Metrics table
CREATE TABLE IF NOT EXISTS physical_health_metrics (
  metric_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  metric_type TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  source TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Mental Health Activities table
CREATE TABLE IF NOT EXISTS mental_health_activities (
  activity_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  duration INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Spiritual Health Practices table
CREATE TABLE IF NOT EXISTS spiritual_health_practices (
  practice_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  practice_type TEXT NOT NULL,
  notes TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Processed Insights table
CREATE TABLE IF NOT EXISTS processed_insights (
  insight_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  linked_entry_ids TEXT NOT NULL,
  insight_type TEXT NOT NULL,
  insight_value TEXT NOT NULL,
  confidence_score INTEGER NOT NULL CHECK(confidence_score >= 0 AND confidence_score <= 100),
  linked_pillars TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  is_dismissed INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
  goal_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  pillar TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value REAL,
  current_value REAL,
  deadline TEXT,
  is_completed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Mind Maps table
CREATE TABLE IF NOT EXISTS mind_maps (
  map_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  map_data TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_energy_logs_user_timestamp ON energy_logs(user_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_user_date ON financial_transactions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_emotion_entries_user_timestamp ON emotion_entries(user_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_physical_health_metrics_user_timestamp ON physical_health_metrics(user_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_mental_health_activities_user_timestamp ON mental_health_activities(user_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_spiritual_health_practices_user_timestamp ON spiritual_health_practices(user_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_processed_insights_user_timestamp ON processed_insights(user_id, timestamp);
`
