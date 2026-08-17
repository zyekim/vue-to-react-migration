import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
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
import { Field, FieldGroup, FieldLabel, FieldError } from "@/shared/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/ui/input-group"
// import { Input } from "@/shared/ui/input"

interface PwdFormValues {
  newPwd: string | ""
  confirmPwd: string | ""
}

type PwdField = keyof PwdFormValues

const PWD_PATTERN = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

const validationPwdForm = (field: PwdFormValues) => {
  const errors: Record<string, string> = {}

  if (!field.newPwd?.trim()) {
    errors.newPwd = "새로운 비밀번호를 입력해주세요"
  } else if (!PWD_PATTERN.test(field.newPwd)) {
    errors.newPwd =
      "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 15자 이내여야 합니다"
  }
  if (!field.confirmPwd?.trim()) {
    errors.confirmPwd = "새로운 비밀번호를 확인해주세요"
  } else if (field.confirmPwd !== field.newPwd) {
    errors.confirmPwd = "비밀번호가 서로 일치하지 않습니다"
  }
  return errors
}

export function PwdChangeDialog() {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isShowNewPwd, setShowNewPwd] = useState(false)
  const [isShowConfirmPwd, setShowConfirmPwd] = useState(false)
  const [formValues, setFormValues] = useState({
    newPwd: "",
    confirmPwd: "",
  })

  const [touched, setTouched] = useState<Partial<Record<PwdField, boolean>>>({})
  const updateField = <Field extends keyof PwdFormValues>(
    field: Field,
    value: PwdFormValues[Field],
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }
  const touchedFields = <Field extends keyof PwdFormValues>(field: Field) => {
    setTouched((currentValues) => ({
      ...currentValues,
      [field]: true,
    }))
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsSaving(false)
      setTouched({})
      setFormValues({
        newPwd: "",
        confirmPwd: "",
      })
    }
    setOpen(nextOpen)
  }

  const errors = validationPwdForm(formValues)
  const isFormValid = Object.keys(errors).length === 0

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isFormValid) {
      return
    }
    try {
      setIsSaving(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("성공적으로 비밀번호가 수정되었습니다.")
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button type="button" variant="default" size="sm">
          비밀번호 변경
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>비밀번호 변경</DialogTitle>
          </DialogHeader>
          <FieldGroup className="py-6">
            <Field
              data-invalid={touched.newPwd ? Boolean(errors.newPwd) : undefined}
            >
              <FieldLabel htmlFor="fieldgroup-newPwd">
                새로운비밀번호 <span className="text-destructive">*</span>
              </FieldLabel>
              {/* <Input
                id="fieldgroup-newPwd"
                placeholder="비밀번호"
                value={formValues.newPwd}
                onChange={(event) => updateField("newPwd", event.target.value)}
                aria-invalid={Boolean(errors.newPwd)}
                required
              /> */}
              <InputGroup>
                <InputGroupInput
                  id="filegroup-newPwd"
                  placeholder="example.com"
                  value={formValues.newPwd}
                  onChange={(event) =>
                    updateField("newPwd", event.target.value)
                  }
                  onBlur={() => touchedFields("newPwd")}
                  type={isShowNewPwd ? "text" : "password"}
                  aria-invalid={
                    touched.newPwd ? Boolean(errors.newPwd) : undefined
                  }
                />

                <InputGroupAddon align="inline-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="show new password"
                    onClick={() => setShowNewPwd(!isShowNewPwd)}
                  >
                    {isShowNewPwd ? <EyeOff /> : <Eye />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <FieldError>
                {touched.newPwd ? Boolean(errors.newPwd) : undefined}
              </FieldError>
            </Field>
            <Field
              data-invalid={
                touched.confirmPwd ? Boolean(errors.confirmPwd) : undefined
              }
            >
              <FieldLabel htmlFor="fieldgroup-confirmPwd">
                새비밀번호 확인 <span className="text-destructive">*</span>
              </FieldLabel>
              {/* <Input
                id="fieldgroup-confirmPwd"
                type="email"
                placeholder="이메일"
                value={formValues.confirmPwd}
                onChange={(event) =>
                  updateField("confirmPwd", event.target.value)
                }
                aria-invalid={Boolean(errors.confirmPwd)}
                required
              /> */}
              <InputGroup>
                <InputGroupInput
                  id="filegroup-confirmPwd"
                  placeholder="example.com"
                  value={formValues.confirmPwd}
                  onChange={(event) =>
                    updateField("confirmPwd", event.target.value)
                  }
                  type={isShowConfirmPwd ? "text" : "password"}
                  onBlur={() => touchedFields("confirmPwd")}
                  aria-invalid={
                    touched.confirmPwd ? Boolean(errors.confirmPwd) : undefined
                  }
                />

                <InputGroupAddon align="inline-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="show new password"
                    onClick={() => setShowConfirmPwd(!isShowConfirmPwd)}
                  >
                    {isShowConfirmPwd ? <EyeOff /> : <Eye />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <FieldError>
                {touched.confirmPwd ? Boolean(errors.confirmPwd) : undefined}
              </FieldError>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              취소
            </DialogClose>
            <Button type="submit" disabled={isSaving || !isFormValid}>
              {isSaving ? (
                <>
                  <Spinner aria-hidden="true" />
                  저장 중...
                </>
              ) : (
                "저장"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
