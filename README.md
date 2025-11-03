# 📊 Google Sheets Data Pipeline & Client Dashboard

This Google Apps Script project provides a robust system for automating a client follow-up dashboard. It centralizes data from multiple source spreadsheets, processes and synchronizes client lists based on their status (e.g., Active, Expired), and generates summary reports.

---

## 🚀 Core Functionalities

### 1. 📥 Data Aggregation (ETL)
A series of `importDistributionData...()` functions act as an ETL (Extract, Transform, Load) pipeline.
* [cite_start]**Extracts** data from various external Google Sheets (sources include "Distribution" [cite: 9][cite_start], "Diet Updates" [cite: 14][cite_start], "WorkoutUpdates" [cite: 21][cite_start], "Medfit" [cite: 68][cite_start], and "expiredclients" [cite: 8]).
* [cite_start]**Loads** this data into a central dashboard spreadsheet, using "staging" sheets like **"Distribution2"** [cite: 3][cite_start], **"DietUpdate2"** [cite: 15][cite_start], **"WorkoutUpdates2"** [cite: 22][cite_start], and **"Medfit2"**[cite: 69].
* [cite_start]The script clears old data before importing the new batch to ensure freshness[cite: 5, 18, 24, 45, 52, 71].

### 2. 🔄 Client Status Synchronization
[cite_start]The `syncClients()` function [cite: 54] is the core engine for managing client lists.
* [cite_start]It reads the consolidated **"Distribution2"** sheet[cite: 54].
* [cite_start]It intelligently compares this list against the **"Active"** [cite: 54, 57] [cite_start]and **"expiredclients"** [cite: 54, 58] sheets.
* [cite_start]**Updates status:** Automatically adds new "Active" or "Freeze" clients [cite: 61][cite_start], moves "Expired" clients to the expired list [cite: 62][cite_start], and updates the status of existing clients[cite: 61].
* [cite_start]**Batch Processing:** It processes all changes in batches (e.g., `setValues`) for better performance[cite: 63, 65].

### 3. ⚡ Real-time Expiry Trigger
[cite_start]An `onEditActive(e)` trigger [cite: 26] [cite_start]actively monitors the **"Active"** sheet for manual edits[cite: 26].
* [cite_start]If a user changes a value in the "Status" column (Column C) [cite: 28] [cite_start]to **"Expired"**[cite: 29].
* [cite_start]The script instantly copies that client's **Code** [cite: 29] [cite_start]and **Agent** [cite: 30] [cite_start]to a separate "expiredclients" spreadsheet[cite: 30].
* [cite_start]It includes a check to prevent adding duplicate entries[cite: 32, 33, 34, 35].

### 4. 📈 Dashboard Reporting
[cite_start]The `countAndSendResult()` function [cite: 36] generates a specific Key Performance Indicator (KPI).
* [cite_start]It counts all rows in the main "Distribution" sheet (starting from a specific row) [cite: 37] [cite_start]where column C has data but column D is empty[cite: 38].
* [cite_start]This final count is then written to a cell in an **"Admin"** sheet [cite: 39] [cite_start]for quick review[cite: 40].
