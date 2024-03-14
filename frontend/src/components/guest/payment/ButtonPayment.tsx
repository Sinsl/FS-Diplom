export interface ButtonPaymentProps {
    click: () => void
}

export const ButtonPayment = ({click}: ButtonPaymentProps) => {
    return (
        <>
            <button className="acceptin-button" onClick={click}>Получить код бронирования</button>

            <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
        </>
    )
}