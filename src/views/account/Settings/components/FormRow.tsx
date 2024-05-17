import classNames from 'classnames'
import { FormItem } from '@/components/ui/Form'
import type { PropsWithChildren } from 'react'
import type { FormikTouched, FormikErrors } from 'formik'

type FormRow<T> = PropsWithChildren<{
    label: string
    errors: FormikErrors<T>
    touched: FormikTouched<T>
    name: keyof T
    border?: boolean
    alignCenter?: boolean
}>

const FormRow = <T extends Record<string, unknown>>(props: FormRow<T>) => {
    const {
        label,
        children,
        errors,
        touched,
        name,
        border = true,
        alignCenter = true,
    } = props

    return (
        <div
            className={classNames(
                'flex flex-col gap-2',
                border && '',
                alignCenter && 'items-center'
            )}
        >
            <div className="font-semibold">{label}</div>
            <div className="col-span-2">
                <FormItem
                    className=""
                    invalid={(errors[name] && touched[name]) as boolean}
                    errorMessage={errors[name] as string}
                >
                    {children}
                </FormItem>
            </div>
        </div>
    )
}

export default FormRow