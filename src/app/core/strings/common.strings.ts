export const commonStrings = Object.freeze({
  header: {
    buttonLabel: 'Dodaj zadanie',
    label: 'Lista zadań',
  },
  filters: {
    nameFilter: {
      label: 'Tytuł zadania',
      placeholder: 'Szukaj po tytule...',
    },
    dateFilter: {
      label: 'Data wydarzenia',
    },
    statusFilter: {
      label: 'Status',
      allOption: 'Wszystkie',
      completedOption: 'Zakończone',
      plannedOption: 'Zaplanowane',
      pendingOption: 'Oczekujące',
    },
  },
  newTask: {
    title: 'Dodaj nowe zadanie',
    form: {
      nameInput: {
        label: 'Nazwa zadania',
        errorRequired: 'Nazwa jest wymagana.',
      },
      dateInput: {
        label: 'Data',
        errorRequired: 'Data jest wymagana.',
        errorPastDate: 'Data nie może być przeszła.',
      },
      descriptionInput: 'Opis zadania',
    },
  },
  actions: {
    save: 'Zapisz',
    cancel: 'Anuluj',
  },
});
