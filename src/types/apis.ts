export type RegisterPayload = {
    first_name: string
    last_name: string
    email: string
    password: string
  }
  
  export type LoginPayload = {
    email: string
    password: string
  }
  
  export type GetCaloriesPayload = {
    dish_name: string
    servings: number
  }
  
  export type CaloriesResponse = {
    dish_name: string
    servings: number
    calories_per_serving: number
    total_calories: number
    source: string
  }
  
  export type AuthResponse = {
    token?: string 
    message?: string
  }
  