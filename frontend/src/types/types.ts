export interface ElemDateType {
    date: Date,
    is_now: boolean,
    is_active: boolean
}

export interface NavItemProp {
    itemDate: ElemDateType,
}

export interface FilmType {
    id: number,
    title: string,
    description?: string,
    url_img: string,
    duration: number,
    country: string,
    bg_color: string,
    isNew?: boolean,
    created_at?: string,
    updated_at?: string
}

export interface FilmProps {
    data: FilmType
}
export interface MoviesListProps {
    filmsId: number
}

export interface Movies {
    created_at: string,
    date: string,
    films_id: number,
    halls_id: number,
    id: number,
    start_time: string,
    title: string,
    is_open?: number,
    updated_at: string,
    films?: FilmType,
    halls?: Halls
}

export interface StateMovies {
    hallId: number,
    hallTitle: string,
    hallOpen: boolean,
    movieArr: Movies[]
}

export interface SeanceHallProps {
    seancesHall: StateMovies
}

export interface Halls {
    count_seat: number,
    created_at: string,
    id: number,
    is_open: boolean,
    rows: number,
    title: string,
    updated_at: string
}

export interface CategorySeats {
    created_at: string,
    hall_id: number,
    id: number,
    price: number,
    title: string,
    updated_at: string
}

export interface Seats {
    active: boolean, 
    category_seats_id: number,
    created_at: string,
    halls_id: number,
    id: number,
    row: number,
    seat: number,
    category_seats: CategorySeats,
    updated_at: string
}

export interface SeatsAdmin {
    active: boolean, 
    category_seats_id: number,
    halls_id: number,
    id: number,
    row: number,
    seat: number,
    category_seats: CategorySeats,
    isChange: boolean,
    isNew: boolean,
    isDel: boolean
}

export interface DataSeatsCats {
    cat_seats: CategorySeats[],
    seats: Seats[]
}

export interface ObjSeatsCat {
    simple?: CategorySeats,
    vip?: CategorySeats
}

export interface TicketSeats {
    created_at: string,
    id: number,
    seat_id: number,
    ticket_id: number,
    updated_at: string
}

export interface Ticket {
    created_at: string,
    id: number,
    is_pay: boolean,
    movies_id: number,
    ticket_seats?: TicketSeats[],
    updated_at: string
}
export interface StatePayment {
    movie: Movies,
    selected: Seats[]
}
export interface MadeTicketSeats {
    seat_cat: string,
    seat_id: number,
    seat_price: number,
    seat_row: number,
    seat_seat: number
}

export interface MadeTicket {
    film_title: string,
    hall_title: string,
    movie_date: string,
    movie_time: string,
    seats: MadeTicketSeats[],
    ticket_id: number,
    ticket_is_pay: boolean,
    ticket_qrcode_url: string
}