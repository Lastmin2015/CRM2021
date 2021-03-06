export function returnHotelStructure (hotel) {
  const {
    hotel_class_id,
    hotel_type_id,
    place_id,
    name,
    distance_to_beach,
    beach_line_num,
    beach_type_id,
    is_beach_private,
    distance_to_slope,
    distance_to_city,
    stars,
    is_recommended,
    is_visited,
    is_active,
    is_bestseller,
    trip_advisor_id,
    trip_advisor_rating,
    trip_advisor_url,
    url_pretty_name,
    latitude,
    longitude,
    google_rating_id,
    google_rating,
    hotel_chain_id,
    keywords,
    room_type_id,
    boarding_type_id,
    updated_at,
  } = hotel

  return {
    hotel_class_id,
    hotel_type_id,
    place_id,
    name,
    distance_to_beach,
    beach_line_num,
    beach_type_id,
    is_beach_private,
    distance_to_slope,
    distance_to_city,
    stars,
    is_recommended,
    is_visited,
    is_active,
    is_bestseller,
    trip_advisor_id,
    trip_advisor_rating,
    trip_advisor_url,
    url_pretty_name,
    latitude,
    longitude,
    google_rating_id,
    google_rating,
    hotel_chain_id,
    keywords,
    room_type_id,
    boarding_type_id,
    hotel_images: null,
    hotel_descriptions: null,
    updated_at,
  }
}