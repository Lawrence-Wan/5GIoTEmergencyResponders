import React from "react";
import { MdSearch } from "react-icons/md";
import { Form, Input } from "react-bootstrap";

export default function SearchInput() {
  return (
    <Form
      inline
      className="cr-search-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
    </Form>
  );
}
