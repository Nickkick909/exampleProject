import React, { useEffect, useState } from "react";
import {  useNavigate } from 'react-router-dom';

import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Divider,
  Modal
} from '@mui/material';

import {
  User,
  Clock,
  XCircle,
  Package
} from 'react-feather';

import MenuBookIcon from '@mui/icons-material/MenuBook';
function Home() {
    const [recipes, setRecipes] = useState([]);

    const [viewRecipe, setViewRecipe] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
      (async () => {
        try {
          let recipes = await axios.get("//localhost:3001/recipe")

          setRecipes(recipes.data);
        } catch (e) {
          console.log("ERROR: ", e)
        }
      })()
     
    }, []);

    function openModal(recipe) {
      setViewRecipe(recipe);
      setModalOpen(true);
    }

    function handleClose() {
      setModalOpen(false);
      setViewRecipe({});
    }
    
    function postRecipe() {
      navigate('/post-recipe');
    }
    return (
      <div>
        <div className="titleSection">
          <Typography variant="h5" className="pageTitle">Browse Recipes</Typography>
          <Button 
            className="postRecipe" 
            variant="contained"
            onClick={postRecipe}>
              Post Your Recipe
          </Button>
        </div>
        {/* <Typography varient="subtitle"></Typography> */}
        <Grid container spacing={2} className="browseGrid">
          {
            recipes && recipes.map( (recipe) => {
              return (
                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <Card onClick={() => openModal(recipe)}>
                    <Divider>{ recipe.title }</Divider>
                    
                    <div className="recipeCardDetail"><User></User>Submitted by: { recipe.name }</div>
                    <div className="recipeCardDetail"><Clock></Clock>Cook Time: { recipe.cookTime }</div>
                    <div className="recipeCardDetail"><Clock></Clock>Prep Time: { recipe.prepTime }</div>

                    <div className="recipeCardDetail"><MenuBookIcon></MenuBookIcon>Number of Ingredients: { recipe.ingredients.length }</div>
                  </Card>
                  
                </Grid>
              )
            })
          }

        </Grid>

        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="viewModal">
            <Card className="modalCard">
              <div className="modalControl">
                <Divider>{ viewRecipe.title }</Divider>
                <XCircle className="modalClose" onClick={handleClose}></XCircle>
              </div>
              
              
              <div className="recipeCardDetail"><User></User>Submitted by: { viewRecipe.name }</div>
              <div className="recipeCardDetail"><Clock></Clock>Cook Time: { viewRecipe.cookTime }</div>
              <div className="recipeCardDetail"><Clock></Clock>Prep Time: { viewRecipe.prepTime }</div>

              <Divider>
                <MenuBookIcon></MenuBookIcon> Ingredients
              </Divider>

              <Grid container spacing={2}>
              {
                viewRecipe.ingredients && viewRecipe.ingredients.map( (ingredient) => {
                  return (
                    <Grid item sm={6}>
                      <div className="recipeCardDetail"><Package></Package>{ ingredient.name } { ingredient.quantity } { ingredient.measurement }</div>
                    </Grid>
                    
                  )
                })
              }
              </Grid>
              {
                viewRecipe.ingredients && viewRecipe.ingredients.length < 1 ? 
                <Typography variant="subtitle1">No ingredients provided</Typography>:''
              }
              <Divider>
                <MenuBookIcon></MenuBookIcon> Instructions
              </Divider>

              <Grid container spacing={2}>
              {
                viewRecipe.steps && viewRecipe.steps.map( (step) => {
                  return (
                    <Grid item sm={12}>
                      <div className="recipeCardDetail">{ step.order + 1 }. { step.instruction }</div>
                    </Grid>
                    
                  )
                })
              }

             
              </Grid>
              {
                viewRecipe.steps && viewRecipe.steps.length < 1 ? 
                <Typography variant="subtitle1">No steps provided</Typography>:''
              }
            </Card>
          </Box>
        </Modal>
      </div> 
    );
  }
  
  export default Home;