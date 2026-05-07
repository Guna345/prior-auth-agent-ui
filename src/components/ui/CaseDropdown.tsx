import SelectDropdown from './SelectDropdown'

interface Props {
  cases: string[]
  value: string
  onChange: (value: string) => void
  label?: string
}

export default function CaseDropdown({ cases, value, onChange, label = 'Select the Case ID' }: Props) {
  return (
    <SelectDropdown
      label={label}
      options={cases}
      value={value}
      onChange={onChange}
    />
  )
}
