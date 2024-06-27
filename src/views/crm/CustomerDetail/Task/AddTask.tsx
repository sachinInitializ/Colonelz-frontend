import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
const [dialogIsOpen, setIsOpen] = useState(false)

const openDialog = () => {
    setIsOpen(true)
}

const onDialogClose = (e: MouseEvent) => {
    console.log('onDialogClose', e)
    setIsOpen(false)
}