import { useState } from "react"
import type { Profile } from "../model/profile"
import {
  validateProfileEditForm,
  type ProfileEditFormValues,
} from "../model/profile-edit-form"

import { teamCodesList, jobCodesList } from "../api/get-profile"
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectContent,
} from "@/shared/ui/select"

interface SelectOption {
  value: string
  label: string
}

interface ProfileEditDialogProps {
  profile: Profile
  onSave: (profile: Profile) => void
}

export function ProfileEditDialog({
  profile,
  onSave,
}: ProfileEditDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formValues, setFormValues] = useState<ProfileEditFormValues>({
    name: profile.name,
    email: profile.email,
    teamCode: profile.teamCode,
    roleCode: profile.roleCode,
  })

  const errors = validateProfileEditForm(formValues)
  const isFormValid = Object.keys(errors).length === 0

  const updateField = <Field extends keyof ProfileEditFormValues>(
    field: Field,
    value: ProfileEditFormValues[Field],
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      const canClose = confirm("작성 중인 데이터가 있습니다. 닫으시겠습니까?")

      if (!canClose) return
    }

    setOpen(nextOpen)

    if (nextOpen) {
      setFormValues({
        name: profile.name,
        email: profile.email,
        teamCode: profile.teamCode,
        roleCode: profile.roleCode,
      })
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) return

    try {
      setIsSaving(true)

      const updatedProfile = {
        ...profile,
        ...formValues,
        team:
          teamOptions.find((item) => item.value === formValues.teamCode)
            ?.label ?? profile.team,
        role:
          jobOptions.find((item) => item.value === formValues.roleCode)
            ?.label ?? profile.role,
      }

      // await updateBp(formData)
      await new Promise((resolve) => {
        setTimeout(resolve, 5000)
      })
      alert("저장되었습니다.")
      onSave(updatedProfile)
      setOpen(false) // 닫기
    } finally {
      setIsSaving(false)
    }
  }

  const teamOptions: SelectOption[] = teamCodesList.map((item) => ({
    value: item.code,
    label: item.name,
  }))

  const jobOptions: SelectOption[] = jobCodesList.map((item) => ({
    value: item.code,
    label: item.name,
  }))

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button type="button" variant="outline" size="sm" />}
      >
        기본정보 수정
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>기본정보 수정</DialogTitle>
          </DialogHeader>
          <FieldGroup className="py-6">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="fieldgroup-name">
                이름 <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fieldgroup-name"
                placeholder="이름"
                value={formValues.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                required
              />
              <FieldError>{errors.name}</FieldError>
            </Field>
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="fieldgroup-email">
                이메일 <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fieldgroup-email"
                type="email"
                placeholder="이메일"
                value={formValues.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                required
              />
              <FieldError>{errors.email}</FieldError>
            </Field>
            <Field data-invalid={Boolean(errors.teamCode)}>
              <FieldLabel htmlFor="fieldgroup-team">
                팀 <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                items={teamOptions}
                value={formValues.teamCode}
                onValueChange={(value) => updateField("teamCode", value ?? "")}
                required
              >
                <SelectTrigger
                  id="fieldgroup-team"
                  aria-invalid={Boolean(errors.teamCode)}
                  className="w-[180px]"
                >
                  <SelectValue placeholder="Team"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teamOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>{errors.teamCode}</FieldError>
            </Field>
            <Field data-invalid={Boolean(errors.roleCode)}>
              <FieldLabel htmlFor="fieldgroup-role">
                역할 <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                items={jobOptions}
                value={formValues.roleCode}
                onValueChange={(value) => updateField("roleCode", value ?? "")}
                required
              >
                <SelectTrigger
                  id="fieldgroup-role"
                  aria-invalid={Boolean(errors.roleCode)}
                  className="w-[180px]"
                >
                  <SelectValue placeholder="Role"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {jobOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>{errors.roleCode}</FieldError>
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
