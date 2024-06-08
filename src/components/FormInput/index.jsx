import { useField } from 'formik';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

export const CustomInput = ({ label, className, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={twMerge("text-black flex flex-col", className)}>
            <label htmlFor={props.name}>{label}</label>
            <input className={`${meta.touched && meta.error ? 'border-red-800' : 'border-slate-950'} bg-white px-2 py-1 mt-1 rounded border`} {...field} {...props} />
            {meta.touched && meta.error && <div style={{ color: 'red' }}> {meta.error}</div>}
        </div>
    )
}

CustomInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
}


export const TextArea = ({ label, className, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={twMerge("text-black flex flex-col", className)}>
            <label htmlFor={props.name}>{label}</label>
            <textarea className={`${meta.touched && meta.error ? 'border-red-800' : 'border-slate-950'} bg-white px-2 py-1 rounded border`} {...field} {...props} />
            {meta.touched && meta.error && <div style={{ color: 'red' }}> {meta.error}</div>}
        </div>
    )
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
}


export const SelectInput = ({ label, className, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className={twMerge("text-black flex flex-col", className)}>
            <label htmlFor={props.name}>{label}</label>
            <select className={`${meta.touched && meta.error ? 'border-red-800' : 'border-slate-950'} bg-white px-2 py-1 mt-1 rounded border`}
                {...field}
                {...props}
                value={field.value || ''}
            />
            {meta.touched && meta.error && <div style={{ color: 'red' }}> {meta.error}</div>}
        </div>
    )
}

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
}

export const CheckboxInput = ({ label, className, ...props }) => {
    const [field] = useField(props)
    return (
        <div className={twMerge("text-black flex flex-col", className)}>
            <input className='bg-white px-2 py-1 mt-1 mr-1'
                {...field}
                {...props}
            />
            <label htmlFor={props.name}>{label}</label>
        </div>
    )
}

CheckboxInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
}
