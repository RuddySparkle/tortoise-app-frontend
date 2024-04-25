import React from 'react';
import { Grid, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import transactionTheme from '@core/theme/transactionTheme';
import { LicenseInfo } from '@mui/x-license';
import dayjs from 'dayjs';

LicenseInfo.setLicenseKey(
    'e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y',
);

function TransactionFilter({ data, filter }: { data: any; filter: any }) {
    const [dateRange, setDateRange] = React.useState<DateRange<dayjs.Dayjs>>([null, null]);
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [status, setStatus] = React.useState('');

    const { ColorButton } = transactionTheme;

    // Handle sumbit
    const handleSubmit = () => {
        const startDate = dateRange[0] ? dateRange[0].toISOString() : '';
        const endDate = dateRange[1] ? dateRange[1].toISOString() : '';

        const filterQuery = {
            startDate,
            endDate,
            paymentMethod,
            status,
        };
        filter(filterQuery);
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={5}
            columns={{ xs: 12 }}
            paddingBottom={6}
            paddingTop={6}
        >
            <Grid item xs={3.6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker value={dateRange} onChange={(newValue) => setDateRange(newValue)} calendars={1} />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={1.8}>
                <FormControl fullWidth>
                    <InputLabel id="payment-method">Payment Method</InputLabel>
                    <Select
                        labelId="payment-method"
                        id="payment-method"
                        value={paymentMethod}
                        label="Payment Method"
                        onChange={(e: SelectChangeEvent) => setPaymentMethod(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="credit card">Credit Card</MenuItem>
                        <MenuItem value="prompt pay">Prompt Pay</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.8}>
                <FormControl fullWidth>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        labelId="status"
                        id="status"
                        value={status}
                        label="Status"
                        onChange={(e: SelectChangeEvent) => setStatus(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1.8}>
                <ColorButton
                    variant="contained"
                    sx={{
                        border: '2px solid #472F05',
                        borderRadius: 0,
                        boxShadow: '4px 4px #472F05',
                        fontSize: 19,
                        '&:hover': {
                            border: '2px solid #472F05',
                            boxShadow: '4px 4px #472F05',
                        },
                    }}
                    onClick={handleSubmit}
                >
                    Apply
                </ColorButton>
            </Grid>
        </Grid>
    );
}

export default TransactionFilter;
