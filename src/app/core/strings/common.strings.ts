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
  taskList: {
    descriptionToggleShow: 'Pokaż opis',
    descriptionToggleHide: 'Ukryj opis',
    completed: 'Zakończone',
    pending: 'Oczekujące',
    planned: 'Zaplanowane',
  },
  newTask: {
    title: 'Dodaj nowe zadanie',
    form: {
      nameInput: {
        label: 'Nazwa zadania',
        errorRequired: 'Nazwa jest wymagana.',
        placeholder: 'Wpisz nazwę zadania',
        errorMaxLength: 'Nazwa nie może przekraczać 30 znaków.',
      },
      dateInput: {
        label: 'Data',
        errorRequired: 'Data jest wymagana.',
        errorPastDate: 'Data nie może być przeszła.',
      },
      descriptionInput: {
        label: 'Opis zadania',
        placeholder: 'Wpisz opis zadania (opcjonalnie)',
        errorMaxLength: 'Opis nie może przekraczać 300 znaków.',
      },
    },
  },
  actions: {
    save: 'Zapisz',
    cancel: 'Anuluj',
  },
});
