import React, { useState, useEffect, useContext, createContext } from "react";
import { get, post } from "../api";
import Form, { Is, useForm } from "../form";
import { Select } from "../form/fields/select";
import { pub, SUCCESS } from "../snackbar";
import { List, ListItemText, ListItem, Button } from "@mui/material";

const UserContext = createContext();

export const UserProvider = ({ children, override }) => {
  const [user, setUser] = useState();
  const [organization, setOrganization] = useState(override?.organization);

  useEffect(() => {
    if (organization != undefined)
      pub("Organization switched: " + organization.name, SUCCESS);
  }, [organization]);

  const login = (username) => {
    setUser(username);
    get("/organizations").then((fetched) => {
      setOrganization(fetched[0]);
    });
  };

  const isLoggedIn = () => !!user;

  return (
    <UserContext.Provider
      value={{ user, organization, setOrganization, login, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => {
  const context = useContext(UserContext);

  if (context == null) throw new Error("No UserProvider parent found.");

  return context;
};

export const OrganizationForm = () => {
  const form = useForm(
    {
      name: [Is.required, Is.minLength(8)],
    },
    (values, notify) => {
      post("/organizations", {
        name: values.name,
      }).then((res) => {
        alert(JSON.stringify(res));
        notify("Created successfully.");
      });
    }
  );
  return (
    <Form form={form}>
      <Form.Fields.TextInput
        name="name"
        label="name"
        hint="The organization name"
      />
      <Form.SubmitButton />
    </Form>
  );
};

export const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  useEffect(() => {
    get("/organizations").then((fetched) => {
      setOrganizations(fetched);
    });
  }, []);

  return (
    <List>
      {organizations.map((c) => (
        <ListItem>
          <ListItemText>{c.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export const DataBucketForm = () => {
  const { organization } = useUserProvider();

  const form = useForm(
    {
      name: Is.required,
    },
    async ({ name }, notify) => {
      return post("/organizations/" + organization.id + "/data_buckets", {
        name,
      }).then((data_bucket) => {
        notify(JSON.stringify(data_bucket));
      });
    }
  );

  return (
    <Form form={form}>
      <Form.Fields.TextInput name="name" hint="The name of the databucket" />
      <Form.SubmitButton />
    </Form>
  );
};

export const OrganizationSelect = () => {
  const { setOrganization, organization } = useUserProvider();
  const [organizations, setOrganizations] = useState([]);
  useEffect(() => {
    get("/organizations").then((fetched) => {
      setOrganizations(fetched);
    });
  }, []);

  const onChange = (value) => {
    setOrganization(organizations.find((c) => c.id == value));
  };

  return (
    <Select
      onChange={onChange}
      value={organization}
      options={organizations.map((c) => ({ value: c.id, label: c.name }))}
    ></Select>
  );
};

export const FieldWizzard = () => {
  const [validators, setValidators] = useState([]);
  const form = useForm({}, (values, notify) => {
    notify(JSON.stringify(values, undefined, 2));
  });
  const addItem = () => {
    setValidators((prev) => [...prev, +new Date()]);
  };
  const removeItem = (c, index) => {
    form.remove(c);
    setValidators((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <Form form={form}>
      <Button onClick={addItem}>Add</Button>
      <List>
        {validators.map((c, i) => (
          <ListItem>
            <Form.Nested name={c}>
              <Form.Fields.TextInput name={"name"} label="Name" />
              <Form.Fields.TextInput name={"regex"} label="Regex" />
              <Button onClick={() => removeItem(c, i)}>Delete</Button>
            </Form.Nested>
          </ListItem>
        ))}
      </List>
      <Form.SubmitButton />
    </Form>
  );
};
