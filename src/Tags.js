import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags() {
  const classes = useStyles();
  // Initialize state with empty arrays to ensure correct types are maintained
  const [value, setValue] = useState([]);
  const [options, setOptions] = useState([]);

  // Fetch tags from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tags")
      .then((response) => {
        // Safely access the tags and options with fallbacks
        const tags = response.data.tags || [];
        const availableOptions = response.data.options || top100Films;
        setValue(tags);
        setOptions(availableOptions);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        setOptions(top100Films); // Fallback to predefined options in case of an error
      });
  }, []);

  // Function to handle tag changes and update the value state
  const handleTagChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to save the current tags
  const saveTags = () => {
    axios
      .post("http://localhost:8080/api/tags", { tags: value })
      .then(() => console.log("Tags updated successfully"))
      .catch((error) => console.error("Error updating tags:", error));
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={options}
        getOptionLabel={(option) => option.title}
        value={value}
        onChange={handleTagChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Movies"
            placeholder="Favorites"
          />
        )}
      />
      <Button onClick={saveTags} color="primary" variant="contained">
        Save
      </Button>
    </div>
  );
}

// Static array of options for the autocomplete component
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960}
];
