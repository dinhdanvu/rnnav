import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    useEffect(() => {
        props.navigation.setParams({mealTitle: selectedMeal.title});
    }, [selectedMeal])

    return(
        <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

MealDetailScreen.navigationOptions = navigationData => {
    const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return{
        headerTitle: mealTitle,
        headerRight: ( <Text>FAV!</Text>
            // <HeaderButtons HeaderButtonComponent={HeaderButton}>
            //     <Item
            //         title="Favorite"
            //         iconName="ios-star"
            //         onPress={() => {

            //         }}
            //     />
            // </HeaderButtons>
        )
    }
}

export default MealDetailScreen;