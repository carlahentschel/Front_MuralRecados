import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';

interface DatePickerValueProps {
  date: Dayjs | null,
  setDate(date: Dayjs | null): void
}

export default function DatePickerValue({ date, setDate } : DatePickerValueProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">

      <DatePicker
        value={date}
        onChange={(newValue) => setDate(newValue)}
      />

    </LocalizationProvider>
  );
}
