export const commonStrings = Object.freeze({
  actions: {
    cancel: 'Anuluj',
    save: 'Zapisz',
  },
  filters: {
    dateFilter: {
      label: 'Data wydarzenia',
    },
    nameFilter: {
      label: 'Tytuł zadania',
      placeholder: 'Szukaj po tytule...',
    },
    statusFilter: {
      allOption: 'Wszystkie',
      completed: 'Zakończone',
      label: 'Status',
      pending: 'Oczekujące',
      planned: 'Zaplanowane',
    },
  },
  header: {
    buttonLabel: 'Dodaj zadanie',
    label: 'Lista zadań',
  },
  newTask: {
    form: {
      dateInput: {
        errorPastDate: 'Data nie może być przeszła.',
        errorRequired: 'Data jest wymagana.',
        label: 'Data',
      },
      descriptionInput: {
        errorMaxLength: 'Opis nie może przekraczać 300 znaków.',
        label: 'Opis zadania',
        placeholder: 'Wpisz opis zadania (opcjonalnie)',
      },
      nameInput: {
        errorMaxLength: 'Nazwa nie może przekraczać 50 znaków.',
        errorRequired: 'Nazwa jest wymagana.',
        label: 'Nazwa zadania',
        placeholder: 'Wpisz nazwę zadania',
      },
    },
    title: 'Dodaj nowe zadanie',
  },
  taskList: {
    completed: 'Zakończone',
    descriptionToggleHide: 'Ukryj opis',
    descriptionToggleShow: 'Pokaż opis',
    noTasksMessage: 'Brak zadań do wyświetlenia.',
    pending: 'Oczekujące',
    planned: 'Zaplanowane',
  },
});
