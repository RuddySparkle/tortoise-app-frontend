import * as React from 'react';
import { Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { fira_sans_400, fira_sans_600, fira_sans_800 } from '@core/theme/theme';
import useGetPetCategory, { IPetCategoryMasterData } from '@services/api/master/useGetPetCategory';
import { useRouter } from 'next/navigation';
import { getValue } from '@mui/system';
import { useForm } from 'react-hook-form';

export default function SearchField() {
    const router = useRouter();

    const { data: petCategory, isSuccess: petCategorySuccess } = useGetPetCategory();
    const petCategoryList = (petCategory || []) as IPetCategoryMasterData[];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [searchingString, setSearchingString] = React.useState<string>('');
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = () => {
        setAnchorEl(null);
        router.refresh();
    };
    const handleSearch = () => {
        console.log(searchingString);
    };

    const CATEGORY_CHOICES = (petCategoryList || []).map((category) => (
        <MenuItem
            onClick={handleSelect}
            sx={{
                '&:hover': {
                    backgroundColor: '#F79762',
                },
            }}
        >
            <Typography color={'#472F05'} fontFamily={fira_sans_600.style.fontFamily}>
                {category.category.replace(/^\w/, (first) => first.toUpperCase())}
            </Typography>
        </MenuItem>
    ));

    return (
        <React.Fragment>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    boxShadow: '5px 4px #472F05',
                    alignItems: 'center',
                    width: '60%',
                    overflow: 'hidden',
                    // backgroundColor: '#EAEAEA !important',
                    backgroundColor: '#FFF',
                    border: '2px solid black',
                    borderRadius: 0,
                }}
            >
                <Tooltip title="Filter">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 1 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <FilterListIcon sx={{ color: '#472F05' }} />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                >
                    <Box width={100}>
                        <Typography pb={1} pl={2} color={'#472F05'} fontFamily={fira_sans_800.style.fontFamily}>
                            Type
                        </Typography>
                        <Divider />
                        {CATEGORY_CHOICES}
                    </Box>
                </Menu>
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        fontFamily: fira_sans_600.style.fontFamily,
                        color: '#472F05',
                    }}
                    defaultValue={searchingString}
                    placeholder="Search"
                    onChange={(e) => setSearchingString(e.target.value)}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton
                    type="button"
                    aria-label="search"
                    sx={{
                        p: '10px',
                    }}
                    onClick={() => {
                        handleSearch();
                    }}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </React.Fragment>
    );
}
