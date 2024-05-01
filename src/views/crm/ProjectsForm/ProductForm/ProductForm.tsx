import { forwardRef, useState } from 'react'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps, FormikProvider, useFormik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ProductImages from './ProjectCreateForm'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui'
import { AdaptableCard } from '@/components/shared'
import axios from 'axios'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    role: 'ADMIN'
    project_name?: string
    client_name?: string
    client_contact?: string
    client_email?: string
    project_type?: string
    description?: string
    leadmanager?: string
    junior_designer?: string
    senior_designer?: string
    supervisor?: string
    visualizer?: string
    project_status?: string
    project_start_date?: string
    timeline_date?: string
    project_end_date?: string
    project_budget?: string
    project_location?: string
    id: '65c32e19e0f36d8e1f30955c'
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    project_name: Yup.string().required('Project Name is required'),
    client_name: Yup.string().required('Client Name is required'),
    client_email: Yup.string()
      .required('Client Email is required')
      .email('Invalid email address')
      .test('is-gmail', 'Must be a Gmail address', (value) => {
        // Custom validation for Gmail address
        return value && value.endsWith('@gmail.com');
      }),
    client_contact: Yup.string()
      .required('Client Contact is required')
      .matches(/^\d{10}$/, 'Must be a 10-digit number'),
    project_type: Yup.string().required('Project Type is required'),
    description: Yup.string().required('Description is required'),
    leadmanager: Yup.string().required('Lead Manager is required'),
    junior_designer: Yup.string().required('Junior Designer is required'),
    senior_designer: Yup.string().required('Senior Designer is required'),
    supervisor: Yup.string().required('Supervisor is required'),
    visualizer: Yup.string().required('Visualizer is required'),
    project_status: Yup.string().required('Project Status is required'),
    project_start_date: Yup.string().required('Project Start Date is required'),
    timeline_date: Yup.string().required('Timeline Date is required'),
    project_end_date: Yup.string().required('Project End Date is required'),
    project_budget: Yup.string().required('Project Budget is required'),
    project_location: Yup.string().required('Project Location is required'),
    // Add validations for other fields as needed
    // ...
  });

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const formik = useFormik({
        initialValues: {
            role: 'ADMIN',
            project_name: '',
            client_name: '',
            client_contact: '',
            client_email: '',
            project_type: '',
            description: '',
            leadmanager: '',
            junior_designer: '',
            senior_designer: '',
            supervisor: '',
            visualizer: '',
            project_status: '',
            project_start_date: '',
            timeline_date: '',
            project_end_date: '',
            project_budget: '',
            project_location: '',
            id: '65c32e19e0f36d8e1f30955c',
            files: [], // Array to hold selected files
        },
        // validationSchema:validationSchema,
        onSubmit: async (values, formikHelpers) => {
            try {
                const formData = new FormData()
                Object.entries(values).forEach(([key, value]) => {
                    if (key === 'files') {
                        let filearray = []
                        value.forEach((file: File, index: number) => {
                            formData.append(`files`, file)
                            console.log('hello')
                        })
                    } else {
                        formData.append(key, value)
                    }
                })
                

                // setShowSuccessMessage(true)
                formikHelpers.setSubmitting(false)
              

              

          
                const response = await axios.post(
                    'https://colonelz.test.psi.initz.run/v1/api/admin/create/project/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
            
                console.log(response)
            } catch (error) {
                console.error('Error submitting form:', error)
            }
        },
    })

    const newId = useUniqueId('product-')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    // Function to handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        formik.setFieldValue('files', files)
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <FormikProvider value={formik}>
                    <FormContainer>
                        <div className="grid grid-cols-1 lg:grid-cols gap-4">
                            <AdaptableCard divider className="mb-4">
                                <h5>Basic Information</h5>
                                <p className="mb-6">
                                    Section to config basic lead information
                                </p>
                                <div className="grid xl:grid-cols-3 xl:grid grid-cols-1 sm:grid-cols-2 :grid gap-5 ">
                                    <FormItem label="Project Name">
                                        <Input
                                            placeholder="Project Name"
                                            name="project_name"
                                            id="project_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_name}
                                        />
                                            {formik.touched.project_name &&
                      formik.errors.project_name && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.project_name}
                        </div>
                      )}
                                    </FormItem>
                                    <FormItem label="Upload Files">
                                        <Input
                                            type="file"
                                            name="files"
                                            id="files"
                                            onChange={handleFileChange}
                                            multiple
                                        />
                                             {formik.touched.files && formik.errors.files && (
                      <div style={{ color: 'red' }}>{formik.errors.files}</div>
                    )}
                                    </FormItem>

                                    <FormItem label="Client Name">
                                        <Input
                                            placeholder="Client Name"
                                            name="client_name"
                                            id="client_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.client_name}
                                        />
                                          {formik.touched.client_name &&
                      formik.errors.client_name && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.client_name}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Client Contact">
                                        <Input
                                            placeholder="Client Contact"
                                            name="client_contact"
                                            id="client_contact"
                                            onChange={formik.handleChange}
                                            value={formik.values.client_contact}
                                        />
                                          {formik.touched.client_contact &&
                      formik.errors.client_contact && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.client_contact}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Client Email">
                                        <Input
                                            placeholder="Client Email"
                                            name="client_email"
                                            id="client_email"
                                            onChange={formik.handleChange}
                                            value={formik.values.client_email}
                                        />
                                          {formik.touched.client_email &&
                      formik.errors.client_email && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.client_email}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Project Type">
                                        <Input
                                            placeholder="Project Type"
                                            name="project_type"
                                            id="project_type"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_type}
                                        />
                                          {formik.touched.project_type &&
                      formik.errors.project_type && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.project_type}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Description">
                                        <Input
                                            placeholder="Description"
                                            name="description"
                                            id="description"
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                        />
                                          {formik.touched.description &&
                      formik.errors.description && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.description}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Lead Manager">
                                        <Input
                                            placeholder="Lead Manager"
                                            name="leadmanager"
                                            id="leadmanager"
                                            onChange={formik.handleChange}
                                            value={formik.values.leadmanager}
                                        />
                                          {formik.touched.leadmanager &&
                      formik.errors.leadmanager && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.leadmanager}
                        </div>
                      )}
                                    </FormItem>
                                    <FormItem label="Timeline">
                                        <Input
                                            placeholder="Timeline Date"
                                            name="timeline_date"
                                            id="timeline_dater"
                                            onChange={formik.handleChange}
                                            value={formik.values.timeline_date}
                                        />
                                          {formik.touched.timeline_date &&
                      formik.errors.timeline_date && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.timeline_date}
                        </div>
                      )}
                                    </FormItem>
                                    <FormItem label="Junior Designer">
                                        <Input
                                            placeholder="Junior Designer"
                                            name="junior_designer"
                                            id="junior_designer"
                                            onChange={formik.handleChange}
                                            value={
                                                formik.values.junior_designer
                                            }
                                        />
                                          {formik.touched.junior_designer &&
                      formik.errors.junior_designer && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.junior_designer}
                        </div>
                      )}
                                    </FormItem>
                                    <FormItem label="Senior Designer">
                                        <Input
                                            placeholder="Senior Designer"
                                            name="senior_designer"
                                            id="senior_designer"
                                            onChange={formik.handleChange}
                                            value={
                                                formik.values.senior_designer
                                            }
                                        />
                                          {formik.touched.senior_designer &&
                      formik.errors.senior_designer && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.senior_designer}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Supervisor">
                                        <Input
                                            placeholder="Supervisor"
                                            name="supervisor"
                                            id="supervisor"
                                            onChange={formik.handleChange}
                                            value={formik.values.supervisor}
                                        />
                                          {formik.touched.supervisor &&
                      formik.errors.supervisor && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.supervisor}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Visualizer">
                                        <Input
                                            placeholder="Visualizer"
                                            name="visualizer"
                                            id="visualizer"
                                            onChange={formik.handleChange}
                                            value={formik.values.visualizer}
                                        />
                                          {formik.touched.visualizer &&
                      formik.errors.visualizer && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.visualizer}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Project Status">
                                        <Input
                                            placeholder="Project Status"
                                            name="project_status"
                                            id="project_status"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_status}
                                        />
                                          {formik.touched.project_status &&
                      formik.errors.project_status && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.project_status}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Project Start Date">
                                        <Input
                                            placeholder="Project Start Date"
                                            name="project_start_date"
                                            id="project_start_date"
                                            onChange={formik.handleChange}
                                            value={
                                                formik.values.project_start_date
                                            }
                                        />
                                          {formik.touched.project_start_date &&
                      formik.errors.project_start_date && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.project_start_date}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Project End Date">
                                        <Input
                                            placeholder="Project End Date"
                                            name="project_end_date"
                                            id="project_end_date"
                                            onChange={formik.handleChange}
                                            value={
                                                formik.values.project_end_date
                                            }
                                        />
                                          {formik.touched.project_end_date &&
                      formik.errors.project_end_date && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.project_end_date}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Project Budget">
                                        <Input
                                            placeholder="Project Budget"
                                            name="project_budget"
                                            id="project_budget"
                                            onChange={formik.handleChange}
                                            value={formik.values.project_budget}
                                        />
                                          {formik.touched.project_budget &&
                      formik.errors.project_budget && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.project_budget}
                        </div>
                      )}
                                    </FormItem>

                                    <FormItem label="Project Location">
                                        <Input
                                            placeholder="Project Location"
                                            name="project_location"
                                            id="project_location"
                                            onChange={formik.handleChange}
                                            value={
                                                formik.values.project_location
                                            }
                                        />
                                          {formik.touched.project_location &&
                      formik.errors.project_location && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.project_location}
                        </div>
                      )}
                                    </FormItem>
                                </div>
                               
                            </AdaptableCard>
                        </div>
                        <StickyFooter
                            className="-mx-8 px-8 flex items-center justify-between py-4"
                            stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        >
                            <div className="md:flex items-center">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    onClick={props.onDiscard}
                                >
                                    Discard
                                </Button>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    icon={<AiOutlineSave />}
                                    type="submit"
                                >
                                    Save
                                </Button>
                                {props.type === 'edit' && (
                                    <DeleteProductButton
                                        onDelete={props.onDelete}
                                    />
                                )}
                            </div>
                        </StickyFooter>
                    </FormContainer>
                </FormikProvider>
            </form>
            {showSuccessMessage && (
                <ConfirmDialog
                    isOpen={showSuccessMessage}
                    type="success"
                    title="Success"
                    onClose={() => setShowSuccessMessage(false)}
                >
                    <p>Data added successfully!</p>
                </ConfirmDialog>
            )}
        </>
    )
})

ProductForm.displayName = 'ProductForm'

export default ProductForm