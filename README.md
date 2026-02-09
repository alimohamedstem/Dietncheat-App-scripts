# 📊 Google Sheets Data Pipeline & Client Dashboard

This Google Apps Script project provides a robust system for automating a client follow-up dashboard. It centralizes data from multiple source spreadsheets, processes and synchronizes client lists based on their status (e.g., Active, Expired), and generates summary reports.

---

## 🚀 Core Functionalities

### 1. 📥 Data Aggregation (ETL)

A series of `importDistributionData...()` functions act as an ETL (Extract, Transform, Load) pipeline.
* **Extracts** data from various external Google Sheets (sources include "Distribution", "Diet Updates", "WorkoutUpdates", "Medfit", and "expiredclients").
* **Loads** this data into a central dashboard spreadsheet, using "staging" sheets like **"Distribution2"**, **"DietUpdate2"**, **"WorkoutUpdates2"**, and **"Medfit2"**.
* The script clears old data before importing the new batch to ensure freshness.

### 2. 🔄 Client Status Synchronization
The `syncClients()` function is the core engine for managing client lists.
* It reads the consolidated **"Distribution2"** sheet.
* It intelligently compares this list against the **"Active"** and **"expiredclients"** sheets.
* **Updates status:** Automatically adds new "Active" or "Freeze" clients, moves "Expired" clients to the expired list, and updates the status of existing clients.
* **Batch Processing:** It processes all changes in batches (e.g., `setValues`) for better performance.

### 3. ⚡ Real-time Expiry Trigger
An `onEditActive(e)` trigger actively monitors the **"Active"** sheet for manual edits.
* If a user changes a value in the "Status" column (Column C) to **"Expired"**.
* The script instantly copies that client's **Code** and **Agent** to a separate "expiredclients" spreadsheet.
* It includes a check to prevent adding duplicate entries.

### 4. 📈 Dashboard Reporting
The `countAndSendResult()` function generates a specific Key Performance Indicator (KPI).
* It counts all rows in the main "Distribution" sheet (starting from a specific row) where column C has data but column D is empty.
* This final count is then written to a cell in an **"Admin"** sheet for quick review.
