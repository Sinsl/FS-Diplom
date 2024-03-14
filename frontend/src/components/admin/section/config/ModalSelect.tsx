
interface ModalSelectProps {
    current: string,
    selectClick: (select: string) => void, 
    left: number
}

export const ModalSelect = ({current, selectClick, left}: ModalSelectProps) => {
    return (
        <ul className="select-cat" style={{left: left + 'px'}}>
            <li className={`select-cat_item ${current === 'conf-step__chair_standart' ? ' selected' : ''}`} onClick={() => selectClick('simple')}>Обычное</li>
            <li className={`select-cat_item ${current === 'conf-step__chair_vip' ? ' selected' : ''}`} onClick={() => selectClick('vip')}>VIP</li>
            <li className={`select-cat_item ${current === 'conf-step__chair_disabled' ? ' selected' : ''}`} onClick={() => selectClick('disabled')}>заблокировано</li>
        </ul>
    )
}