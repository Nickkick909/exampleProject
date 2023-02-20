// material-ui
import {
    TextField,
    Button,
    Grid,
    Card,
    Divider,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostRecipe() {

    const [formFields, setFormFields] = useState({});
    const [errors, setErrors] = useState({});

    const [ingredientList, setIngredientList] = useState([])
    const [stepList, setStepList] = useState([])

    const navigate = useNavigate()


    function addIngredient() {     
        setIngredientList([...ingredientList, {}])
    }

    function handleIngredientChange(value, index, fieldName) {
        let tempIngredients = ingredientList;

        tempIngredients[index][fieldName] = value
        
        setIngredientList([...tempIngredients])
    }

    function addStep() {     
        setStepList([...stepList, {}])
    }

    function handleStepChange(value, index, fieldName) {
        let tempSteps = stepList;

        tempSteps[index][fieldName] = value
        
        setStepList([...tempSteps])
    }

    async function handleSubmit() {
        // Check for required fields
        let errorFound = false;
        let tempErrors = {}
        setErrors({})
        if (!formFields.name) {
            tempErrors.name = "Your name is required"
            errorFound = true;
        }
        if (!formFields.title) {
            tempErrors.title = "A recipe title is required"
            errorFound = true;
        }
        if (!formFields.cookTime) {
            tempErrors.cookTime = "Cook time is required"
            errorFound = true;
        }
        if (!formFields.prepTime) {
            tempErrors.prepTime = "Prep time is required"
            errorFound = true;
        }

        setErrors(tempErrors)

        // If no errors are found then send the API request
        if (!errorFound) {
            let response = await axios.post("//localhost:3001/recipe", {
                recipe: formFields,
                ingredients: ingredientList,
                steps: stepList
            })
    
            if (response.status == 200) {
                navigate('/')
            }
        }
        
    }

    function handleChange(value, field) {
        setFormFields({
            ...formFields,
            [field]: value
        })
    }

    return (
        <>
            <Grid container
                spacing={2}>
                <Grid item sm={12}>
                    <Typography variant="h5" className="pageTitle">Post Recipe</Typography>
                </Grid>
                <Grid
                    item
                    sm={6}
                    xs={12}
                >
                    <Card>
                        <Divider>General Information</Divider>
                        <Grid container
                            spacing={3}>

                            <Grid item sm={6} xs={12} >
                                <TextField
                                    required
                                    id="outline-required1"
                                    fullWidth
                                    onChange={(e) => handleChange(e.target.value, "name")}
                                    helperText={errors.name}
                                    label="Your Name"
                                    name="name"
                                    
                                />
                            </Grid>

                            <Grid item sm={6} xs={12} >
                                <TextField
                                    required
                                    id="outline-required2"
                                    fullWidth
                                    onChange={(e) => handleChange(e.target.value, "title")}
                                    helperText={errors.title}
                                    label="Recipe Title"
                                    name="title"
                                    InputProps={{
                                        inputProps: {
                                            maxlength: "20"
                                        },
                                        }}
                                    
                                />
                            </Grid>

                            <Grid item sm={6} xs={12} >
                                <TextField
                                    required
                                    id="outline-required3"
                                    fullWidth
                                    onChange={(e) => handleChange(e.target.value, "cookTime")}
                                    helperText={errors.cookTime}
                                    label="Cook Time"
                                    name="cookTime"
                                    
                                />
                            </Grid>

                            <Grid item sm={6} xs={12} >
                                <TextField
                                    required
                                    id="outline-required4"
                                    fullWidth
                                    onChange={(e) => handleChange(e.target.value, "prepTime")}
                                    helperText={errors.prepTime}
                                    label="Prep Time"
                                    name="prepTime"
                                    
                                />
                            </Grid>      

                        </Grid>
                    </Card>
                </Grid>
                <Grid
                    item
                    sm={6}
                    xs={12}
                    spacing={2}
                >    
                    <Card>
                        <Divider>Ingredients</Divider>
                        
                        <Grid container spacing={3}>
                                
                            <Grid item>
                                <Grid container spacing={3}>
                                    {
                                        ingredientList && ingredientList.map( (ingredientVal, index) => {
                                            return (
                                                <Grid item>
                                                    <Grid container spacing={3}>
                                                        <Grid item sm={4} xs={12} >
                                                            <TextField
                                                                required
                                                                id="outline-required6"
                                                                fullWidth
                                                                onChange={(e) => handleIngredientChange(e.target.value, index, "ingredientName")}
                                                                label="Ingredient Name"
                                                                name="ingredientName"
                                                                
                                                            />
                                                        </Grid>
                                                        <Grid item sm={4} xs={12} >
                                                            <TextField
                                                                required
                                                                id="outline-required6"
                                                                fullWidth
                                                                onChange={(e) => handleIngredientChange(e.target.value, index, "ingredientQuantity")}
                                                                label="Quantity"
                                                                type="number"
                                                                name="ingredientQuantity"
                                                                
                                                            />
                                                        </Grid>
                                                        <Grid item sm={4} xs={12} >
                                                            <TextField
                                                                required
                                                                id="outline-required6"
                                                                fullWidth
                                                                onChange={(e) => handleIngredientChange(e.target.value, index, "ingredientMeasurement")}
                                                                label="Measurement"
                                                                name="ingredientMeasurement"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>

                            <Grid item className="center">
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={addIngredient}
                                >Add Ingredient</Button>
                            </Grid> 
                        </Grid>
                    </Card>   
                </Grid>

                <Grid
                    item
                    sm={12}
                    spacing={2}
                >    
                    <Card>
                        <Divider>Steps</Divider>
                        <Grid container spacing={3}>
                            {
                                stepList && stepList.map( (stepVal, index) => {
                                    let label = `Step ${index + 1}:`
                                    return (
                                            <Grid item sm={12} >
                                                <TextField
                                                    required
                                                    id="step"
                                                    fullWidth
                                                    onChange={(e) => handleStepChange(e.target.value, index, "instruction")}
                                                    label={label}
                                                    name="step"
                                                    multiline={true}
                                                />
                                            </Grid>
                                            
                                    )
                                })
                            }

                            <Grid item className="center">
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={addStep}
                                >Add Step</Button>
                            </Grid> 
                        </Grid>
                    </Card>   
                </Grid>

                <Grid item sm={12} className="rightSide">
                    <Button
                        color="secondary"
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                    >Save</Button>
                </Grid>
            </Grid>
        </>
    );
};