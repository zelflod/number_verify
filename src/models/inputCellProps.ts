export default interface InputCellProps {
    onChange: () => void;
    valid: boolean;
    value: string;
    maxLength?: number;
}
