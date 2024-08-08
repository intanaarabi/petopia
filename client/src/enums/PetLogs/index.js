
export const LogsCategoryType = Object.freeze({
    HEALTH: "health",
    GROWTH: "growth"
})

export const LogsType = Object.freeze({
    VACCINATION: "health",
    MEDICATION: "growth",
    MEDICAL_HISTORY: "medical",
    GROOMING: "grooming",
    WEIGHT: "weight"
})

export const categoryLogTypes = {
    [LogsCategoryType.HEALTH]: [LogsType.VACCINATION, LogsType.MEDICAL_HISTORY, LogsType.MEDICATION],
    [LogsCategoryType.GROWTH]: [LogsType.GROOMING, LogsType.WEIGHT],
  };

export const logsColDefinitions = {
    [LogsType.VACCINATION]: [
      { header: 'Vaccine Name', accessor: 'vaccineName' },
      { header: 'Received On', accessor: 'receivedOn' },
      { header: 'Due Date', accessor: 'dueDate' },
      { header: 'Veterinary', accessor: 'veterinary' },
      { header: 'Notes', accessor: 'notes' },
    ],
    [LogsType.MEDICAL_HISTORY]: [
      { header: 'Condition', accessor: 'condition' },
      { header: 'Diagnosed On', accessor: 'diagnosedOn' },
      { header: 'Treatment', accessor: 'treatment' },
      { header: 'Notes', accessor: 'notes' },
    ],
    [LogsType.MEDICATION]: [
      { header: 'Medication Name', accessor: 'medicationName' },
      { header: 'Start Date', accessor: 'startDate' },
      { header: 'End Date', accessor: 'endDate' },
      { header: 'Dosage', accessor: 'dosage' },
      { header: 'Notes', accessor: 'notes' },
    ],
    [LogsType.GROOMING]: [
      { header: 'Grooming Date', accessor: 'groomingDate' },
      { header: 'Groomer', accessor: 'groomer' },
      { header: 'Notes', accessor: 'notes' },
    ],
    [LogsType.WEIGHT]: [
      { header: 'Weight', accessor: 'weight' },
      { header: 'Date', accessor: 'date' },
      { header: 'Notes', accessor: 'notes' },
    ]
}