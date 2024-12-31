"use client";

export default function DeleterUser () {
    return (
        <Button
                variant="bordered"
                color="danger"
                radius="sm"
                onClick={async() => await deleteUser()}
                startContent={<Trash size={17} />}
                 className="my-2 font-semibold"
            >
            Delete account
        </Button>
    )
}