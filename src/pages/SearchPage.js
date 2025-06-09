import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Grid, MenuItem, Select, FormControl,
    InputLabel, Button, Pagination, TextField
} from '@mui/material';
import axios from '../api/axiosInstance';

const SearchPage = () => {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [dogIds, setDogIds] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [city, setCity] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [zipCodes, setZipCodes] = useState([]);

    const pageSize = 10;
    
    useEffect( () => {
        axios.get('/dogs/breeds').then(res => setBreeds(res.data))
    }, []);

    useEffect(() => {
        const fetchDogIds = async () => {
            const res = await axios.get('/dogs/search', {
                params: {
                    breeds: selectedBreed ? [selectedBreed] : undefined,
                    zipCodes: zipCodes.length > 0 ? zipCodes : undefined,
                    sort: `breed:${sortOrder}`,
                    size: pageSize,
                    from: (currentPage - 1) * pageSize,
                }
            });
            setDogIds(res.data.resultIds)
            setTotalPages(Math.ceil(res.data.total/pageSize));
        };
        fetchDogIds();
    }, [selectedBreed, sortOrder, currentPage, zipCodes]);

    useEffect(() => {
        if (dogIds.length === 0) return;
        axios.post('/dogs', dogIds).then(res => setDogs(res.data));
    }, [dogIds]);

    const handleMatch = async () => {
        const res = await axios.post('/dogs/match', favorites);
        const matchId = res.data.match;
        const match = await axios.post('/dogs', [matchId]);
        alert(`🎉 Your match is ${match.data[0].name}!`);
    }

    const toggleFavorite = (dogId) => {
        setFavorites(prev =>
            prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
        )
    }

    useEffect(() => {
        const fetchZipCodes = async () => {
            if (!city && !stateCode) {
                setZipCodes([]);
                return;
            }

            try {
                const res = await axios.post('/locations/search', {
                    city: city || undefined,
                    states: stateCode ? [stateCode] : undefined,
                    size: 100,
                });
                setZipCodes(res.data.results.map(loc => loc.zip_code));
            } catch (err) {
                console.error("Failed to fetch ZIP codes", err);
            }
        };

        fetchZipCodes();
    }, [city, stateCode]);

    return (
        <Container sx={{mt: 5}}>
            <Typography variant="h4" mb={3}>Browse Dogs</Typography>

            <FormControl sx={{ mr: 2, minWidth: 200 }}>
                <InputLabel>Breed</InputLabel>
                <Select value={selectedBreed} onChange={e => setSelectedBreed(e.target.value)} label="Breed">
                <MenuItem value=""><em>All Breeds</em></MenuItem>
                {breeds.map(breed => (
                    <MenuItem key={breed} value={breed}>{breed}</MenuItem>
                ))}
                </Select>
            </FormControl>

            <FormControl sx={{ mr: 2, minWidth: 150 }}>
                <InputLabel>Sort</InputLabel>
                <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)} label="Sort">
                <MenuItem value="asc">Breed Ascending</MenuItem>
                <MenuItem value="desc">Breed Descending</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ mr: 2, minWidth: 200 }}>
                <TextField
                    label="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                </FormControl>

                <FormControl sx={{ mr: 2, minWidth: 100 }}>
                <TextField
                    label="State"
                    value={stateCode}
                    onChange={e => setStateCode(e.target.value.toUpperCase())}
                />
            </FormControl>

            <Button variant="contained" disabled={favorites.length === 0} onClick={handleMatch}>
                Generate Match
            </Button>

            <Grid container spacing={2} mt={2}>
                {dogs.map(dog => (
                <Grid item xs={12} md={6} lg={4} key={dog.id}>
                    <div style={{
                    border: '1px solid #ccc',
                    padding: 16,
                    borderRadius: 8,
                    backgroundColor: favorites.includes(dog.id) ? '#e0f7fa' : '#fff',
                    }}>
                    <img src={dog.img} alt={dog.name} width="100%" />
                    <Typography variant="h6">{dog.name}</Typography>
                    <Typography>Breed: {dog.breed}</Typography>
                    <Typography>Age: {dog.age}</Typography>
                    <Typography>ZIP Code: {dog.zip_code}</Typography>
                    <Button
                        size="small"
                        variant={favorites.includes(dog.id) ? "outlined" : "contained"}
                        onClick={() => toggleFavorite(dog.id)}
                        sx={{ mt: 1 }}
                    >
                        {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
                    </Button>
                    </div>
                </Grid>
                ))}
            </Grid>

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                sx={{ mt: 4 }}
            />
        </Container>
    );
};

export default SearchPage;