import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/shared/ui/dialog"

import { Spinner } from "@/shared/ui/spinner"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import type { Bp } from "../model/profile"
interface EditActionsProps {
  isSaving: boolean
  onCancel: () => void
}

function EditActions({ isSaving, onCancel }: EditActionsProps) {
  return (
    <>
      <Button type="button" variant="outline" onClick={onCancel}>
        취소
      </Button>

      <Button type="submit" disabled={isSaving}>
        저장
        {isSaving && <Spinner data-icon="inline-start" />}
      </Button>
    </>
  )
}
function ViewActions({ onEdit }: { onEdit: () => void }) {
  return (
    <>
      <DialogClose render={<Button type="button" variant="outline" />}>
        닫기
      </DialogClose>

      <Button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          onEdit()
        }}
      >
        수정
      </Button>
    </>
  )
}

export function BPDialog({ bpInfo }: { bpInfo: Bp }) {
  const [isEdit, setIsEdit] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isEdit) {
      const canClose = confirm("작성 중인 데이터가 있습니다. 닫으시겠습니까?")

      if (!canClose) return
    }

    setOpen(nextOpen)

    if (!nextOpen) {
      setIsEdit(false)
    }
  }

  const handleCancel = () => {
    if (isEdit) {
      const confirmMsg = confirm(
        "작성중인 데이터가 있습니다. 취소하시겠습니까?",
      )
      if (confirmMsg) {
        setIsEdit(false)
      }
      return
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setIsSaving(true)

      // await updateBp(formData)
      await new Promise((resolve) => {
        setTimeout(resolve, 5000)
      })
      alert("저장되었습니다.")
      setIsEdit(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button variant="outline" size="icon-xs" className="cursor-pointer">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>조직정보</DialogTitle>
          </DialogHeader>
          <FieldGroup className="py-6">
            <Field>
              <FieldLabel htmlFor="fieldgroup-name">조직명</FieldLabel>
              <Input
                disabled={!isEdit}
                id="fieldgroup-name"
                placeholder="조직명"
                defaultValue={bpInfo.name}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-representative-name">
                대표자명
              </FieldLabel>
              <p>{bpInfo.representativeName}</p>
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-invoice-email">
                인보이스메일
              </FieldLabel>
              <Input
                disabled={!isEdit}
                id="fieldgroup-invoice-email"
                type="email"
                placeholder="[EMAIL_ADDRESS]"
                defaultValue={bpInfo.taxInvoiceEmail}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            {isEdit ? (
              <EditActions isSaving={isSaving} onCancel={handleCancel} />
            ) : (
              <ViewActions onEdit={() => setIsEdit(true)} />
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
