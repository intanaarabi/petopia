import { createColumnHelper } from '@tanstack/react-table';

export const LogsCategoryType = Object.freeze({
    HEALTH: "health",
    GROWTH: "growth"
})

export const LogsType = Object.freeze({
    VACCINATION: "vaccination",
    MEDICATION: "medication",
    MEDICAL_HISTORY: "medical",
    GROOMING: "grooming",
    WEIGHT: "weight"
})

export const categoryLogTypes = {
    [LogsCategoryType.HEALTH]: [LogsType.VACCINATION, LogsType.MEDICAL_HISTORY, LogsType.MEDICATION],
    [LogsCategoryType.GROWTH]: [LogsType.GROOMING, LogsType.WEIGHT],
  };

const columnHelper = createColumnHelper();
  export const logsColDefinitions = {
    [LogsType.VACCINATION]: [
      columnHelper.accessor('vaccineName', {
        header: () => 'Vaccine Name',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('dateGiven', {
        header: () => 'Received On',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('dateDue', {
        header: () => 'Due Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('administeredBy', {
        header: () => 'Administered By',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('clinic', {
        header: () => 'Clinic',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
    ],
    [LogsType.MEDICAL_HISTORY]: [
      columnHelper.accessor('condition', {
        header: () => 'Condition',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('diagnosedOn', {
        header: () => 'Diagnosed On',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('treatment', {
        header: () => 'Treatment',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('notes', {
        header: () => 'Notes',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
    ],
    [LogsType.MEDICATION]: [
      columnHelper.accessor('medicationName', {
        header: () => 'Medication Name',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('startDate', {
        header: () => 'Start Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('endDate', {
        header: () => 'End Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('dosage', {
        header: () => 'Dosage',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('notes', {
        header: () => 'Notes',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
    ],
    [LogsType.GROOMING]: [
      columnHelper.accessor('groomingDate', {
        header: () => 'Grooming Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('groomer', {
        header: () => 'Groomer',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('notes', {
        header: () => 'Notes',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
    ],
    [LogsType.WEIGHT]: [
      columnHelper.accessor('weight', {
        header: () => 'Weight',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('date', {
        header: () => 'Date',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('notes', {
        header: () => 'Notes',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
    ],
  };