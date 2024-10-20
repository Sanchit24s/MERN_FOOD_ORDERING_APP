import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

function SearchPage() {
    const { city } = useParams();
    const { results } = useSearchRestaurants(city);
    return (
        <span>
            User search for {city}{" "}
            <span>
                {results?.data.map((restaurant) => (
                    <span>
                        found - {restaurant.restaurantName}, {restaurant.city}
                    </span>
                ))}
            </span>
        </span>
    );
}

export default SearchPage;
