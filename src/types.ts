export type RootVenueData = RootSuccessVenueData & RootError

export type RootShopping = RootSuccessShoppingData & RootError

interface RootSuccessShoppingData {
    draw: number
    recordsTotal: number
    recordsFiltered: number
    data: DataShopping
    comment: string
}

interface RootSuccessVenueData {
    draw: number
    recordsTotal: number
    recordsFiltered: number
    data: Data
    comment: string
}

interface RootError {
    error: string;
}

export interface DataShopping {
    LastChangedId: string
    AdditionalSeats: any
    NewShoppingCart: NewShoppingCart
}

export interface NewShoppingCart {
    Items: Item[]
    ItemsToPay: ItemsToPay[]
    ItemsForPayment: any[]
    ItemsForBuddyReservation: any[]
    TotalCount: number
    TicketCount: number
    SubTotal: number
    Total: number
    VatTotal: number
    Shipping: Shipping
    Payment: Payment
    id: string
    Count: number
    ContainsAbonnements: boolean
    ContainsExclusiveAbonnements: boolean
    TwoLinePersonalisationIsMissing: boolean
    ContainsNonAbonnements: boolean
    IsQuickOrder: boolean
    IsCompanyOrder: boolean
    VatRemark: string
    ShowMoreText: string
    ShowLessText: string
    TicketsText: string
    LockMessageWhilePaying: string
    LockChanges: boolean
    NeedsReminder: boolean
    Reminder: string
    ValidationState: string
    ValidationMessage: string
    SubTotalText: string
    PaymentCostsText: string
    ShippingCostsText: string
    VatRemarkText: string
    SummeText: string
    EmptyShoppingCartWarning: string
    TicketCountText: string
    ShoppingCartText: string
    DeleteItemText: string
    RemoveVoucherText: string
    RemoveTicketText: string
    RemoveTicketFromShoppingCartText: string
    CommentText: string
    RebookText: string
    ProductConfigText: string
    ReservationChangeText: string
    LinkCustomerText: string
    IdentificationText: string
    TrackingContentHtml: string
}

export interface Item {
    HasChanged: boolean
    HasValidationProblem: boolean
    ResaleRegulation: any
    TicketType: TicketType
    Count: number
    CountIsEditable: boolean
    Name1: string
    Name2: string
    Name3: string
    Name4: string
    Name5: string
    Name6: string
    Name7: string
    Name8: string
    Name9: string
    Name10: string
    Name11: string
    Name12: string
    Comment: string
    CommentExists: boolean
    Price: number
    Discount: number
    PriceWithDiscount: number
    Total: number
    TotalDiscount: number
    IsDiscountCoupon: boolean
    IsPartOfPayment: boolean
    IsBonus: boolean
    IsNew: boolean
    Url: string
    TicketId: string
    ProductId: string
    PosId: string
    PersonalisationNeeded: string
    LinkCustomerNeeded: boolean
    IDCardIdentificationNeeded: boolean
    ReservationInfosNeeded: boolean
    PersonalisationMissing: string
    TicketAdditionPossible: string
    TicketAdditionMissing: string
    TicketAdditionEditable: boolean
    TicketAdditionText: string
    BlockId: string
    NegativeAmount: boolean
    IsBundlePart: boolean
    ShowNamesFrom: number
    VoucherCode: string
    DiscountType: string
    UserImageNeeded: boolean
    UserImageExists: boolean
    TicketContentId: string
    UserImageId: string
    PhotoMissingText: string
    UserNamingIsPossible: boolean
    UsernameOnTicketText: string
    UserOfTicketText: string
    DetailedPersonalisationNeeded: boolean
    TicketUserName: string
    TicketUserIsBuyer: boolean
    TicketUserIdNumber: string
    SellingHintExists: boolean
    IsWebVoucherUsage: boolean
    IsReservation: boolean
    ChangeNeeded: boolean
    EventId: string
    EventDateTime: string
    SeatTypeId: string
    EventDateTimeForId: string
    EventDateTimeAsString: string
    FirstTicketInEvent: boolean
    HasValidationProblemInEvent: boolean
    LastTicketInEvent: boolean
    TicketsInEvent: number
    TotalSumInEvent: number
    GalleryImages: any
    ImageId: string
    ProductConfigPossible: boolean
    ImagePart2Id: string
    ParentProductId: string
}

export interface TicketType {
    Name1: string
    Name2: string
    SalesNote: string
    Id: string
    IsSeasonTicket: boolean
}

export interface ItemsToPay {
    HasChanged: boolean
    HasValidationProblem: boolean
    ResaleRegulation: any
    TicketType: TicketType2
    Count: number
    CountIsEditable: boolean
    Name1: string
    Name2: string
    Name3: string
    Name4: string
    Name5: string
    Name6: string
    Name7: string
    Name8: string
    Name9: string
    Name10: string
    Name11: string
    Name12: string
    Comment: string
    CommentExists: boolean
    Price: number
    Discount: number
    PriceWithDiscount: number
    Total: number
    TotalDiscount: number
    IsDiscountCoupon: boolean
    IsPartOfPayment: boolean
    IsBonus: boolean
    IsNew: boolean
    Url: string
    TicketId: string
    ProductId: string
    PosId: string
    PersonalisationNeeded: string
    LinkCustomerNeeded: boolean
    IDCardIdentificationNeeded: boolean
    ReservationInfosNeeded: boolean
    PersonalisationMissing: string
    TicketAdditionPossible: string
    TicketAdditionMissing: string
    TicketAdditionEditable: boolean
    TicketAdditionText: string
    BlockId: string
    NegativeAmount: boolean
    IsBundlePart: boolean
    ShowNamesFrom: number
    VoucherCode: string
    DiscountType: string
    UserImageNeeded: boolean
    UserImageExists: boolean
    TicketContentId: string
    UserImageId: string
    PhotoMissingText: string
    UserNamingIsPossible: boolean
    UsernameOnTicketText: string
    UserOfTicketText: string
    DetailedPersonalisationNeeded: boolean
    TicketUserName: string
    TicketUserIsBuyer: boolean
    TicketUserIdNumber: string
    SellingHintExists: boolean
    IsWebVoucherUsage: boolean
    IsReservation: boolean
    ChangeNeeded: boolean
    EventId: string
    EventDateTime: string
    SeatTypeId: string
    EventDateTimeForId: string
    EventDateTimeAsString: string
    FirstTicketInEvent: boolean
    HasValidationProblemInEvent: boolean
    LastTicketInEvent: boolean
    TicketsInEvent: number
    TotalSumInEvent: number
    GalleryImages: any
    ImageId: string
    ProductConfigPossible: boolean
    ImagePart2Id: string
    ParentProductId: string
}

export interface TicketType2 {
    Name1: string
    Name2: string
    SalesNote: string
    Id: string
    IsSeasonTicket: boolean
}

export interface Shipping {
    Total: number
    Name: string
    Vat: string
    id: string
}

export interface Payment {
    Total: number
    Name: string
    Vat: string
    id: string
    Show: boolean
}


export interface Data {
    AverageSitzScale: number
    Blocks: Block[]
    SeatTypes: SeatType[]
    ID: string
    Width: number
    Height: number
    IsAction: boolean
    Factor: number
    Helptext: string
    HelptextHead: string
    HelptextFoot: string
    HelptextBlockTicketsHead: string
    HelptextBlockTicketsFoot: string
    HelptextTickets: string
    HelptextSeatTicketsHead: string
    HelptextSeatTicketsFoot: string
    HelptextNoBooking: string
    SeatZoom: number
    VenueBackgroundSVG: string
    VenueBookingType: number
    PreventSingleSeatsText: string
    CoronaBooking: boolean
}

export interface Block {
    Number: number
    Visible: boolean
    Touchable: boolean
    Blocked: boolean
    CurrentResellingId: any
    x: number
    y: number
    Width: number
    Height: number
    TextAngle: number
    PolyPoints?: PolyPoint[]
    BackgroundColor: string
    ID: string
    FullName: string
    ShortName: string
    Stand: string
    SightID: string
    TextColor: string
    TextScale: number
    TextX: number
    TextY: number
    IsCircle: boolean
    IsRect: boolean
    IsPoly: boolean
    RowType: string
    Seatbooking: boolean
    SeatTypeId: string
    FullPercentage: number
    FreeCapacity: string
    Rectangles: any[]
    Images: any[]
    Texts: any[]
    Lines: any[]
}

export interface PolyPoint {
    X: number
    Y: number
}

export interface SeatType {
    Number: number
    Name: string
    ID: string
    Color: string
}