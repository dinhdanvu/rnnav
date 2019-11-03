import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealScreen = props => {
    const renderMealItem = itemData => {
        return <MealItem 
            title={itemData.item.title} 
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetail',
                    params: {
                    mealId: itemData.item.id
                }
            })
        }} />;
    }

    const catId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    // const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)
    return(
        <View style={styles.screen}>
            {/* <Text>CategoryMealScreen Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Details" onPress={() => {
                props.navigation.navigate('MealDetail')
            }} />
            <Button title="Go Back" onPress={() => {
                props.navigation.goBack();
            }}
            /> */}
            <FlatList 
                keyExtractor={(item, index) => item.id} 
                data={displayedMeals} 
                renderItem={renderMealItem} 
                style={{width: '100%'}}
            />
        </View>
    )
}

CategoryMealScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryMealScreen;